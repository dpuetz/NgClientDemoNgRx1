import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { IMessage, Message } from '../shared/IMessage';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ICurrentUser, CurrentUser } from './icurrent-user';
import * as fromAdmin from './state/admin.reducer';
import * as adminActions from './state/admin.actions';

@Component({
    templateUrl: './update-account.component.html'
})

export class UpdateAccountComponent implements OnInit, OnDestroy {


componentActive = true;
model: ICurrentUser = new CurrentUser();
popup : IMessage;
private validationMessages: { [key: string]: { [key: string]: string } };
firstNameMsg: string;
accountForm: FormGroup;
isSaving= false;

/////////////



////////////
    constructor( private router: Router,
                 private fb: FormBuilder,
                 private store: Store<fromAdmin.State>
                 ) {
        this.validationMessages = {
            firstName: {
                required: 'Please enter your first name.'
            }
        }
    };  //constructor

    ngOnInit() {
        // this.store.dispatch(new userActions.());
        this.createAccountForm();
        this.watchAccount();
        this.watchFirstName();
        this.watchCountry();
        this.watchErrors();
    }
    watchAccount(): void {
        this.store
            .pipe(
                    select(fromAdmin.getCurrentUser),
                    takeWhile(() => this.componentActive)
                )//pipe
            .subscribe(userAccount => {
                if(userAccount) {
                    console.log('create-account.component account', JSON.stringify(userAccount));
                    if (this.isSaving) {
                        this.isSaving = false;
                        // this.complete.emit(userAccount.firstName);
                        // this.router.navigate(['/websites']);
                        console.log('account saved', userAccount);
                    }
                }
            })//subscribe
    }//watchForLogin()

    createAccountForm (): void {
        this.accountForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        })
    }

    watchFirstName(): void {
        const ctrl = this.accountForm.get('firstName');
        ctrl.valueChanges
                .pipe(
                        debounceTime(100),
                        takeWhile(() => this.componentActive))
                .subscribe(value => {
                            this.setMessage(ctrl, 'firstName'); }
        );
    }
    watchCountry(): void {
        const usernameControl = this.accountForm.get('country');
        usernameControl.valueChanges
                .pipe(
                        takeWhile(() => this.componentActive)
                )
                .subscribe(value => {
                            console.log('country changed', value);
                        }
        );
    }

    setMessage(c: AbstractControl, name: string): void {
        switch (name)   {
            case 'firstName':
                this.firstNameMsg = '';
                if ((c.touched || c.dirty) && c.errors) {
                    this.firstNameMsg = Object.keys(c.errors).map(key =>
                                this.validationMessages.firstName[key]).join(' ');
                }
                break;

        } //switch
    } //setMessage

   watchErrors () {
        this.store
            .pipe(
                    select(fromAdmin.getError),
                    takeWhile(() => this.componentActive)
            )
            .subscribe(err => {
                if(err) {
                    let obj = JSON.parse(err);
                    if (obj['error'] && obj['error'] === 'Username already in use.') {
                        this.popup = new Message('alert', 'This username is already in use. Please pick a new one.', "", 0);
                    } else {
                        this.popup = new Message('alert', 'Sorry, an error has occurred', "", 0);
                    }
                    this.store.dispatch(new adminActions.ClearCurrentError());
                }
            })//subscribe
    }//watchForErrors

    saveIt(): void {
        this.isSaving = true;
        let info = {...this.model, ...this.accountForm.value};
        this.store.dispatch(new adminActions.CreateAccount( info ));
    };

    ngOnDestroy() {
        this.componentActive = false;
    }


}//class