import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { throwError, Observable } from "rxjs";
import { ICurrentUser, convertToCurrentUser, getGuestCurrentUserFromId } from "./icurrent-user";
import { ILogin } from "../security/ilogin";
import { tap, map, catchError } from "rxjs/operators";
import { IAccount, convertToUserAccount } from "./iaccount";
import { AuthService } from "../security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

private domain = environment.baseUrl;
private loginUrl: string;
private createUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService) {
        this.loginUrl = this.domain + 'api/users';
        this.createUrl = this.domain + 'api/account';
    }

    private log(message: string) {
        console.log("Log Message = ", message);
    }

    doLogin(loginInfo: ILogin): Observable<ICurrentUser> {
        // console.log('doLogin');
        return this.http
            .post<HttpResponse<ICurrentUser>>(this.loginUrl, loginInfo, { observe: 'response' })
            .pipe (
                // tap(response => console.log('doLogin tap', response)),
                map(response => convertToCurrentUser(response.body)),
                tap(response => this.authService.currentUser = response),
                catchError(this.handleError('doLoginError', null))
            );//pipe
    }

    createAccount(loginInfo: ILogin): Observable<ICurrentUser> {
        return this.http
            .post<HttpResponse<ICurrentUser>>(this.createUrl, loginInfo, { observe: 'response' })
            .pipe (
                // tap(response => console.log('createAccount http response', response)),
                map((response) => getGuestCurrentUserFromId(response.body)),
                tap(response => this.authService.currentUser = response),
                catchError(this.handleError('createAccount', null))
            );//pipe
    }

    updateAccount(account: IAccount): Observable<ICurrentUser> {
        const url = this.createUrl + '/' + account.accountId;
        console.log('updateAccount Service url', url);
        return this.http
            .put<HttpResponse<ICurrentUser>>(url, account, { observe: 'response' })
            .pipe (
                // tap(response => console.log('UpdateAccount Service', response)),
                map((response) => convertToCurrentUser(response.body)),
                tap(response => this.authService.currentUser = response),
                // tap(response => console.log('UpdateAccount Final Return', response)),
                catchError(this.handleError('UpdateAccount Service', null))
            );//pipe
    }

    getAccount(accountId: number): Observable<IAccount> {
        const url = this.createUrl + '/' + accountId;
        console.log('getAccount Service url', url);
        return this.http
            .get<HttpResponse<ICurrentUser>>(url, { observe: 'response' })
            .pipe (
                tap(response => console.log('getAccount Service response', response)),
                map((response) => convertToUserAccount(response.body)),
                tap(response => console.log('getAccount Service response.body', response)),
                catchError(this.handleError('getAccount Service', null))
            );//pipe
    }

   private handleError<T> (operation = 'operation', result?: T) {  //https://angular.io/tutorial/toh-pt6
        return (error: any): Observable<T> => {

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // TODO: send the error to remote logging infrastructure
            let errMsg = JSON.stringify(error, null, 4);
            this.log('error=' + errMsg); // log to console instead

            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return throwError(errMsg);
        }
    };  //handleError

}//class