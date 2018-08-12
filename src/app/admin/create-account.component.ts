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
    templateUrl: './create-account.component.html'
})

export class CreateAccountComponent implements OnInit, OnDestroy {

componentActive = true;
model: ICurrentUser = new CurrentUser();
popup : IMessage;
private validationMessages: { [key: string]: { [key: string]: string } };
userNameMsg: string;
passwordMsg: string;
accountForm: FormGroup;
isSaving = false;

    constructor( private router: Router,
                 private fb: FormBuilder,
                 private store: Store<fromAdmin.State>
                 ) {
        this.validationMessages = {
            userName: {
                required: 'Please enter your user name.'
            },
            password: {
                required: 'Please enter your password.',
                minlength: 'Password must be at least 4 characters long.',
                maxlength: 'Password cannot be more than 10 characters long.'
            }
        }
    };  //constructor

    ngOnInit() {
        // this.store.dispatch(new userActions.());
        this.createAccountForm();
        this.watchAccount();
        this.watchUserName();
        this.watchPassword();
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
                        this.router.navigate(['/update']);
                        console.log('account saved', userAccount);
                    }
                }
            })//subscribe
    }//watchForLogin()


    createAccountForm (): void {
        this.accountForm = this.fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
        })
    }

    watchUserName(): void {
        const ctrl = this.accountForm.get('userName');
        ctrl.valueChanges
                .pipe(
                        debounceTime(100),
                        takeWhile(() => this.componentActive))
                .subscribe(value => {
                            this.setMessage(ctrl, 'userName'); }
        );
    }
    watchPassword(): void {
        const ctrl = this.accountForm.get('password');
        ctrl.valueChanges
            .pipe(
                debounceTime(100),
                takeWhile(() => this.componentActive)
            )
            .subscribe(value => {
                this.setMessage(ctrl, 'password'); }
            );
    }

    setMessage(c: AbstractControl, name: string): void {
        switch (name)   {
            case 'userName':
                this.userNameMsg = '';
                if ((c.touched || c.dirty) && c.errors) {
                    this.userNameMsg = Object.keys(c.errors).map(key =>
                            this.validationMessages.userName[key]).join(' ');
                }
                break;
            case 'password':
                this.passwordMsg = '';
                if ((c.touched || c.dirty) && c.errors)
                {
                    this.passwordMsg = Object.keys(c.errors)
                       .map(key =>
                            this.validationMessages.password[key]).join(' ');
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