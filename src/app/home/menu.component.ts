import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../admin/state/admin.reducer';
import { takeWhile } from 'rxjs/operators';
import * as adminActions from '../admin/state/admin.actions';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, OnDestroy {

componentActive = true;
firstName: string = '';

    constructor( private router: Router,
                 private store: Store<fromAdmin.State>
                 ) {}

    ngOnInit() {
        this.watchForLogin();
    }

    watchForLogin(): void {
        this.store
            .pipe(
                    select(fromAdmin.getCurrentUser),
                    takeWhile(() => this.componentActive)
            )
            .subscribe(currentuser => {
                    if(currentuser) {
                        // console.log('MenuComponent userAccount', JSON.stringify(userAccount));
                        if (currentuser.userName) {
                            this.firstName = currentuser.userName;
                    }
                }
            })
            
    }//watchForLogin()

    logOut(): void {
        this.store.dispatch(new adminActions.ClearCurrentUser());
        this.router.navigate(['/welcome']);
    }

     ngOnDestroy() {
        this.componentActive = false;
     }

}// class

