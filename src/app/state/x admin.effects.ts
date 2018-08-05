// import { Injectable } from "@angular/core";
// import { UserService } from "../user/user.service";
// import * as fromUsers from './admin.reducer';
// import { Store, Action } from "@ngrx/store";
// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { Observable, of } from "rxjs";
// import * as userActions from './admin.actions';
// import { map, mergeMap, catchError } from "rxjs/operators";
// import { IUser } from "../user/iuser";


// @Injectable()
// export class UserEffects {
//     constructor(private userService: UserService,
//                 private store: Store<fromUsers.State>,
//                 private actions$: Actions ){}


//     @Effect()
//     doLogin$: Observable<Action> = this.actions$
//         .pipe(
//             ofType(userActions.UserActionTypes.Login),
//             map((action: userActions.Login) => action.payload), //map
//             mergeMap((user:IUser) =>
//                         this.userService.doLogin(user).pipe(
//                             map(userAccount => (new userActions.LoginSuccess(userAccount))),
//                             catchError(err => of(new userActions.LoginFail(err)))
//                         )//pipe
//             )//mergemap
//     ); //pipe


//  } //class UserEffects