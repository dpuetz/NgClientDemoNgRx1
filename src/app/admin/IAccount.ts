import { ICurrentUser } from "./icurrent-user";

export interface IAccount {
    accountId: number;
    firstName: string;
    lastName: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export class Account implements IAccount {
    accountId: number = 0;
    firstName: string = '';
    lastName: string = '';
    street1: string = '';
    street2: string = '';
    city: string = '';
    state: string = '';
    country: string = '';
    zip: string = '';
}

// export function getCurrentUser (currentUser: any): ICurrentUser {
//     let user = new currentUser();
//     user.firstName = currentUser.firstName;
//     user.token = currentUser.token;
//     return user;
// }

export function convertToUserAccount (userAccount: any): IAccount {
    let acct = new Account();
    acct.accountId = userAccount.accountID;
    acct.firstName = userAccount.firstName;
    acct.lastName = userAccount.lastName;
    acct.street1 = userAccount.street1;
    acct.street2 = userAccount.street2;
    acct.city = userAccount.city;
    acct.state = userAccount.state;
    acct.country = userAccount.country;
    acct.zip = userAccount.zip;
    return acct;
}

