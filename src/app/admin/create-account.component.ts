import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { IMessage, Message } from '../shared/IMessage';
import { debounceTime, tap, takeWhile } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ICurrentUser, CurrentUser } from './icurrentuser';
import * as fromAdmin from '../admin/state/admin.reducer';
import * as adminActions from '../admin/state/admin.actions';

@Component({
    templateUrl: './create-account.component.html'
})

export class CreateAccountComponent implements OnInit, OnDestroy {

// @Output() complete: EventEmitter<string> = new EventEmitter<string>();

componentActive = true;
model: ICurrentUser = new CurrentUser();
popup : IMessage;
private validationMessages: { [key: string]: { [key: string]: string } };
firstNameMsg: string;
userNameMsg: string;
passwordMsg: string;
accountForm: FormGroup;
isSaving= false;


    constructor( private router: Router,
                 private fb: FormBuilder,
                 private store: Store<fromAdmin.State>
                 ) {
        this.validationMessages = {
            userName: {
                required: 'Please enter your user name.'
            },
            password: {
                required: 'Please enter your password.'
            },
            firstName: {
                required: 'Please enter your first name.'
            }
        }
    };  //constructor

    ngOnInit() {
        // this.store.dispatch(new userActions.());
        this.createAccountForm();
        this.watchAccount();
        this.watchUserName();
        this.watchPassword();
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
                    // else {
                    //     this.badLogin();
                    // }
                }
            })//subscribe
    }//watchForLogin()

    createAccountForm (): void {
        this.accountForm = this.fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
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
                        takeWhile(() => this.componentActive))
                .subscribe(value => {
                            this.setMessage(ctrl, 'password'); }
        );
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
            case 'userName':
                this.userNameMsg = '';
                if ((c.touched || c.dirty) && c.errors) {
                    this.userNameMsg = Object.keys(c.errors).map(key =>
                                this.validationMessages.userName[key]).join(' ');
                }
                break;
            case 'password':
                this.passwordMsg = '';
                if ((c.touched || c.dirty) && c.errors) {
                    this.passwordMsg = Object.keys(c.errors).map(key =>
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
                )//pipe
            .subscribe(err => {
                if(err) {
                    console.log('login-component err', JSON.stringify(err));
                    this.store.dispatch(new adminActions.ClearCurrentError());
                    this.popup = new Message('alert', 'Sorry, an error has occurred', "", 0);
                }
            })//subscribe
    }//watchForErrors

    // badLogin(): void {
    //     this.popup = new Message('alert', 'Since this is a demo, I\'ll login for you.', "onComplete", 0);
    // }

    // onComplete(event:any):void{
    //     this.router.navigate(['/websites']);
    // }

    saveIt(): void {
        // let info = Object.assign({}, this.model, this.accountForm.value);
        this.isSaving = true;
        let info = {...this.model, ...this.accountForm.value};
        this.store.dispatch(new adminActions.CreateAccount( info ));
    };

    ngOnDestroy() {
        this.componentActive = false;
    }



}//class