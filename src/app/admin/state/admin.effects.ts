import { Injectable } from '@angular/core';
// import { AdminService } from "../user/user.service";
import { AdminService } from '../admin.service';
import * as fromAdmin from './admin.reducer';
import { Store, Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import * as adminActions from './admin.actions';
import { map, mergeMap, catchError, tap } from "rxjs/operators";
// import { ILogin } from "../../user/ILogin";
import { ILogin } from '../../login/ILogin';
import { ICurrentUser } from '../ICurrentUser';
import { IAccount, getCurrentUser } from '../IAccount';


@Injectable()
export class AdminEffects {
    constructor(private adminService: AdminService,
                private store: Store<fromAdmin.State>,
                private actions$: Actions ){}


    @Effect()
    doLogin$: Observable<Action> = this.actions$
        .pipe(
            ofType(adminActions.AdminActionTypes.Login),
            map((action: adminActions.Login) => action.payload), //map
            mergeMap((login:ILogin) =>
                        this.adminService.doLogin(login).pipe(
                            tap(val => console.log(val)),
                            map(currentUser => (new adminActions.LoginSuccess(currentUser))),
                            catchError(err => of(new adminActions.LoginFail(err)))
                        )//pipe
            )//mergemap
    ); //pipe

    @Effect()
    createAccount$: Observable<Action> = this.actions$
        .pipe(
            ofType(adminActions.AdminActionTypes.CreateAccount),
            map((action: adminActions.CreateAccount) => action.payload), //map
            mergeMap((accountInfo:IAccount) =>
                        this.adminService.createAccount(accountInfo).pipe(
                            map(userInfo => (new adminActions.CreateAccountSuccess(getCurrentUser(userInfo)))),
                            catchError(err => of(new adminActions.CreateAccountFail(err)))
                        )//pipe
            )//mergemap
    ); //pipe


 } //class UserEffects

// import { Injectable } from "@angular/core";
// // import { AdminService } from "../.service";

// // import * as fromAdmin from './admin.reducer';
// import { Store, Action } from "@ngrx/store";
// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { Observable, of } from "rxjs";
// // import * as adminActions from './admin.actions';
// import { map, mergeMap, catchError } from "rxjs/operators";
// import { IAccount } from "../IAccount";

// @Injectable()
// export class AdminEffects {
//     constructor(private adminService: AdminService,
//                 private store: Store<fromAdmin.State>,
//                 private actions$: Actions ){}

//     @Effect()
//     createAccount$: Observable<Action> = this.actions$
//         .pipe(
//             ofType(adminActions.UserActionTypes.CreateAccount),
//             map((action: adminActions.CreateAccount) => action.payload), //map
//             mergeMap((accountInfo:IAccount) =>
//                         this.adminService.createAccount(accountInfo).pipe(
//                             map(userAccount => (new adminActions.CreateAccountSuccess(userAccount))),
//                             catchError(err => of(new adminActions.CreateAccountFail(err)))
//                         )//pipe
//             )//mergemap
//     ); //pipe


//  } //class