export interface ICurrentUser {
    firstName: string;
    token: string;
}

export class CurrentUser implements ICurrentUser {
    firstName: string = '';
    token: string = '';
}
