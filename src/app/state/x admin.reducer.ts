// import * as fromRoot from './app.state';
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AdminActions, AdminActionTypes } from './admin.actions';
// import { ICurrentUser } from './admin/ICurrentUser';

// //interface for entire application state
// export interface State extends fromRoot.State {
//     admin: AdminState
// }

// // interface for this slice of state
// export interface AdminState {
//     currentUser: ICurrentUser,
//     error: string
// }

// //set an initial state so never any undefined
// const initialState: AdminState = {
//     currentUser: null,
//     error: ''
// }

// //Create a const for the entire feature slice
// const getUserFeatureState = createFeatureSelector<AdminState>('admin');

// //then use that to create a selector for each in initialState
// export const getCurrentUser = createSelector (
//     getUserFeatureState,
//     state => state.currentUser
// )
// export const getError = createSelector (
//     getUserFeatureState,
//     state => state.error
// );

// //use optional parameters to set the state to the initial state
// export function adminReducer (state = initialState, action: AdminActions): AdminState {
//     switch (action.type) {
//         case AdminActionTypes.LoginSuccess:
//             return {
//                 ...state,
//                 currentUser: action.payload // ? {...action.payload}
//             }
//         case AdminActionTypes.LoginFail:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         case AdminActionTypes.ClearCurrentError:
//             return {
//                 ...state,
//                 error: ''
//             }

//         default:
//             return state;
//     }//switch

// }//userReducer
