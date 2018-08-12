import { Injectable } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../admin/state/admin.reducer';
import { ICurrentUser, CurrentUser } from '../admin/icurrent-user';

@Injectable({providedIn: 'root'})
export class AuthService {

    private user: ICurrentUser = new CurrentUser();
    get currentUser(): ICurrentUser {
        // console.log('AuthService get', this.user);
        return this.user;
    }
    set currentUser(user: ICurrentUser) {
        this.user = user;
        // console.log('AuthService set', this.user);
    }

    private redirUrl: string = '';
    get redirectUrl(): string {
        // console.log('AuthService get redirUrl', this.redirUrl);
        return this.redirUrl;
    }
    set redirectUrl(inUrl: string) {
        this.redirUrl = inUrl;
        // console.log('AuthService set redirUrl', this.redirUrl);
    }

    constructor( ) { }

} //class
