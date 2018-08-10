export interface ICurrentUser {
    userName: string;
    token: string;
}

export class CurrentUser implements ICurrentUser {
    userName: string = '';
    token: string = '';
}
