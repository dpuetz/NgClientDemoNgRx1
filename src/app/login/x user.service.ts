// //angular for services
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { HttpClient, HttpHeaders  } from '@angular/common/http';
// import { environment } from '../../environments/environment';

// //my models
// import { IUser } from './iuser';
// import { IAccount, getUserAccount } from '../admin/IAccount';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//     private domain = environment.baseUrl;

//     private loginUrl: string;

//     constructor(private http: HttpClient) {
//         this.loginUrl = this.domain + 'api/users';
//     }

//     doLogin(user: IUser): Observable<IAccount>{
//         return this.http
//             .put<IAccount>(this.loginUrl, user,  httpOptions)
//             .pipe(
//                 map(response => getUserAccount(response)),
//                 // tap(val => this.log('doLogin Service2 = ' + JSON.stringify(val, null, 4))),
//                 tap(val => this.log('doLogin')),
//                 catchError(this.handleError2('doLoginError', null) )
//             );  //pipe
//     }//doLogin



//     private log(message: string) {
//         console.log("Log Message = ", message);
//     }

//     private handleError2<T> (operation = 'operation', result?: T) {  //https://angular.io/tutorial/toh-pt6
//         return (error: any): Observable<T> => {

//             // TODO: better job of transforming error for user consumption
//             this.log(`${operation} failed: ${error.message}`);

//             // TODO: send the error to remote logging infrastructure
//             let str = JSON.stringify(error, null, 4);
//             this.log('error=' + str); // log to console instead

//             // Let the app keep running by returning an empty result.
//             return of(result as T);
//         };
//     } // handleError

// }//class