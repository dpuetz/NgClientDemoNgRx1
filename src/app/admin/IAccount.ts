import { ICurrentUser } from "./icurrentuser";

export interface IAccount {
    accountID: number;
    username: string;
    password: string;
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
    accountID: number = 0;
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    street1: string = '';
    street2: string = '';
    city: string = '';
    state: string = '';
    country: string = '';
    zip: string = '';
}

export function getCurrentUser (currentUser: any): ICurrentUser {
    let user = new currentUser();
    user.firstName = currentUser.firstName;
    user.token = currentUser.token;
    return user;
}

// export function getUserAccount (userAccount: any): IAccount {
//     let profile = new Account();
//     profile.accountID = 0;
//     profile.firstName = userAccount.firstName;
//     profile.lastName = userAccount.lastName;
//     profile.street1 = userAccount.street1;
//     profile.street2 = userAccount.street2;
//     profile.city = userAccount.city;
//     profile.state = userAccount.state;
//     profile.country = userAccount.country;
//     profile.zip = userAccount.zip;
//     return profile;
// }

