import { Action } from "@ngrx/store";
import { ICurrentUser} from "../icurrentuser";
import { ILogin } from '../../login/ilogin';
import { IAccount } from "../IAccount";

export enum AdminActionTypes {
    Login = '[Admin] Login',
	LoginSuccess = '[Admin] Login Success',
	LoginFail = '[Admin] Login Fail',
    ClearCurrentError = '[Admin] Clear Error',
    CreateAccount = '[Admin] Create Account',
    CreateAccountSuccess = '[Admin] Create Account Success',
    CreateAccountFail = '[Admin]  Create Account Fail',
    ClearCurrentUser = '[Admin] Clear Current User'
}

export class Login implements Action {
    readonly type = AdminActionTypes.Login
    constructor (public payload: ILogin){}
}
export class LoginSuccess implements Action {
    readonly type = AdminActionTypes.LoginSuccess
    constructor (public payload: ICurrentUser){}
}
export class LoginFail implements Action {
    readonly type = AdminActionTypes.LoginFail
    constructor (public payload: string){}
}
export class ClearCurrentError implements Action {
    readonly type = AdminActionTypes.ClearCurrentError
    constructor (){}
}

export class CreateAccount implements Action {
    readonly type = AdminActionTypes.CreateAccount
    constructor (public payload: IAccount){}
}
export class CreateAccountSuccess implements Action {
    readonly type = AdminActionTypes.CreateAccountSuccess
    constructor (public payload: ICurrentUser){}
}
export class CreateAccountFail implements Action {
    readonly type = AdminActionTypes.CreateAccountFail
    constructor (public payload: string){}
}
export class ClearCurrentUser implements Action {
    readonly type = AdminActionTypes.ClearCurrentUser
    constructor (){}
}


export type AdminActions =
          Login
        | LoginSuccess
        | LoginFail
        | ClearCurrentError
        | CreateAccount
        | CreateAccountSuccess
        | CreateAccountFail
        | ClearCurrentUser


// import { Action } from "@ngrx/store";
// import { IAccount } from "../IAccount";

// export enum AdminActionTypes {
//     ClearCurrentAccount = '[Users] Clear Current Account',
//     CreateAccount = '[Users] Create Account',
// 	CreateAccountSuccess = '[Users] Create Account Success',
// 	CreateAccountFail = '[Users] Create Account Fail'
// }

// export class ClearCurrentAccount implements Action {
//     readonly type = AdminActionTypes.ClearCurrentAccount
//     constructor (){}
// }
// export class CreateAccount implements Action {
//     readonly type = AdminActionTypes.CreateAccount
//     constructor (public payload: IAccount){}
// }
// export class CreateAccountSuccess implements Action {
//     readonly type = AdminActionTypes.CreateAccountSuccess
//     constructor (public payload: IAccount){}
// }
// export class CreateAccountFail implements Action {
//     readonly type = AdminActionTypes.CreateAccountFail
//     constructor (public payload: string){}
// }

// export type AdminActions =
//         | ClearCurrentAccount
//         | CreateAccount
//         | CreateAccountSuccess
//         | CreateAccountFail
