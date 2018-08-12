export interface ICurrentUser {
    userName: string;
    userId: number;
}

export class CurrentUser implements ICurrentUser {
    userName: string = '';
    userId: number = 0;
}

export function convertToCurrentUser(webserviceOutput: any) : ICurrentUser{
    // console.log('convertToCurrentUser webserviceOutput', webserviceOutput);
    let user = new CurrentUser();
    user.userName = webserviceOutput.firstName;
    user.userId = webserviceOutput.accountID;
    return user;
}

export function getGuestCurrentUserFromId(webserviceOutput: any) : ICurrentUser{
    let user = new CurrentUser();
    user.userName = "Guest";        //we don't have their name yet
    user.userId = webserviceOutput;  //this is the new account id
    return user;
}

