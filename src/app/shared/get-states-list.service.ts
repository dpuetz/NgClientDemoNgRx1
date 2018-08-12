import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class GetStatesService {

    states_us: string = null;
    states_ca: string = null;
    httpUrl: string;
    private domain = environment.baseUrl;

    constructor(private http: HttpClient) {
        this.httpUrl = this.domain + 'api/users';
    }

    getStates (region: string): Observable<string> {
        //if we already have it then just return it.
        const cachedStates = this.getCache(region);
        this.log('getStates cachedStates ' + cachedStates);
        if (cachedStates) {
            return of(cachedStates);
        }

        //we don't have it, so get it
        const url = `${this.httpUrl}/${region}`;
        this.log(url);
        return this.http
            .get<HttpResponse<string>>(url, { observe: 'response' })
            .pipe (
                tap( val => console.log(`getStates status: ${val.status}, ok: ${val.ok}, statusText: ${val.statusText}, type: ${val.type}, url: ${val.url}`)),
                map( val=> val.body),
                tap( (val:string) => this.setCache(region, val)),
                tap(val => this.log('getStates val = ' + val)),
                catchError(this.handleError('getStates', null) )
            );
    } //getStatesUS

    private getCache(region) {
        switch (region) {
            case 'us':
                if (this.states_us) {
                    return this.states_us;
                }
                break;
            case 'ca':
                if (this.states_ca) {
                    return this.states_ca;
                }
                break;
            default:
                return null;
        }
    }//getCache

    setCache(region:string, statesString: string): void {
        switch (region) {
            case 'us':
                this.states_us = statesString;
                break;
            case 'ca':
                this.states_ca = statesString;
                break;
        }
        this.log('setCache statesString = ' + statesString);
    }

    private log(message: string) {
            console.log("get-states-list.service = ", message);
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