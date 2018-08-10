import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { throwError, Observable } from "rxjs";
import { ICurrentUser } from "./icurrentuser";
import { ILogin } from "../login/ilogin";
import { tap, map, catchError } from "rxjs/operators";
import { IAccount } from "./IAccount";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

private domain = environment.baseUrl;
private loginUrl: string;

    constructor(private http: HttpClient) {
        this.loginUrl = this.domain + 'api/users';
    }

    private log(message: string) {
        console.log("Log Message = ", message);
    }

    doLogin(loginInfo: ILogin): Observable<ICurrentUser> {
        return this.http
            .put<HttpResponse<ICurrentUser>>(this.loginUrl, loginInfo, { observe: 'response' })
            .pipe (
                tap(response => console.log(response)),
                map(response => response.body),
                catchError(this.handleError('doLoginError', null))
            );//pipe
    }

    createAccount(accountInfo: IAccount): Observable<ICurrentUser> {
        return this.http
            .post<HttpResponse<ICurrentUser>>(this.loginUrl, accountInfo, { observe: 'response' })
            .pipe (
                tap(response => console.log(response)),
                map(response => response.body),
                catchError(this.handleError('createAccount', null))
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