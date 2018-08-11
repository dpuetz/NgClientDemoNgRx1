import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminActions, AdminActionTypes } from './admin.actions';
import { ICurrentUser} from "../icurrent-user";

//interface for entire application state
export interface State extends fromRoot.State {
    admin: AdminState
}

// interface for this slice of state
export interface AdminState {
    currentUser: ICurrentUser,
    error: string
}

//set an initial state so never any undefined
const initialState: AdminState = {
    currentUser: null,
    error: ''
}

//Create a const for the entire feature slice
const getUserFeatureState = createFeatureSelector<AdminState>('admin');

//then use that to create a selector for each in initialState
export const getCurrentUser = createSelector (
    getUserFeatureState,
    state => state.currentUser
)
export const getError = createSelector (
    getUserFeatureState,
    state => state.error
);

//use optional parameters to set the state to the initial state
export function adminReducer (state = initialState, action: AdminActions): AdminState {
    switch (action.type) {
        case AdminActionTypes.LoginSuccess:
            return {
                ...state,
                currentUser: action.payload // ? {...action.payload}
            }
        case AdminActionTypes.LoginFail:
            return {
                ...state,
                error: action.payload
            }
        case AdminActionTypes.ClearCurrentError:
            return {
                ...state,
                error: ''
            }
        case AdminActionTypes.CreateAccountSuccess:
            return {
                ...state,
                currentUser: action.payload,
                error: ''
            }
        case AdminActionTypes.CreateAccountFail:
            return {
                ...state,
                currentUser: null,
                error: action.payload
            }
        case AdminActionTypes.ClearCurrentUser:
            return {
                ...state,
                currentUser: null
            }
        case AdminActionTypes.UpdateAccountSuccess:
            return {
                ...state,
                currentUser: action.payload,
                error: ''
            }
        case AdminActionTypes.UpdateAccountFail:
            return {
                ...state,
                currentUser: null,
                error: action.payload
            }

        default:
            return state;
    }//switch

}//userReducer


// import * as fromRoot from '../../state/app.state';
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AdminActions, AdminActionTypes } from './admin.actions';
// import { IAccount } from '../IAccount';

// //interface for entire application state
// export interface State extends fromRoot.State {
//     user: UserState
// }

// // interface for this slice of state
// export interface UserState {
//     userAccount: IAccount,
//     error: string
// }

// //set an initial state so never any undefined
// const initialState: UserState = {
//     userAccount: null,
//     error: ''
// }

// //Create a const for the entire feature slice
// const getUserFeatureState = createFeatureSelector<UserState>('user');

// //then use that to create a selector for each in initialState
// export const getUserAccount = createSelector (
//     getUserFeatureState,
//     state => state.userAccount
// )
// export const getError = createSelector (
//     getUserFeatureState,
//     state => state.error
// );

// //use optional parameters to set the state to the initial state
// export function adminReducer (state = initialState, action: AdminActions): UserState {
//     switch (action.type) {
//         case AdminActionTypes.ClearCurrentAccount:
//             return {
//                 ...state,
//                 userAccount: null
//             }
//         case AdminActionTypes.CreateAccountSuccess:
//             return {
//                 ...state,
//                 userAccount: action.payload // ? {...action.payload}
//             }
//         case AdminActionTypes.CreateAccountFail:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         default:
//             return state;
//     }//switch

// }//userReducer
