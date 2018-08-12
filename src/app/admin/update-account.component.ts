import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select, State } from '@ngrx/store';
import { IMessage, Message } from '../shared/IMessage';
import { debounceTime, takeWhile, map, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ICurrentUser, CurrentUser } from './icurrent-user';
import * as fromAdmin from './state/admin.reducer';
import * as adminActions from './state/admin.actions';
import { IAccount, Account } from "./iaccount";
import { AdminService } from "./admin.service";
import { GetStatesService } from "../shared/get-states-list.service";
import { AuthService } from "../security/auth.service";


@Component({
    templateUrl: './update-account.component.html'
})

export class UpdateAccountComponent implements OnInit, OnDestroy {

componentActive = true;
model: IAccount = new Account();
popup : IMessage;
private validationMessages: { [key: string]: { [key: string]: string } };
firstNameMsg: string;
accountForm: FormGroup;
isSaving= false;
isLoading = true;
stateList: any[] = [];

    constructor( private router: Router,
                 private fb: FormBuilder,
                 private store: Store<fromAdmin.State>,
                 private adminService: AdminService,
                 private getStatesService: GetStatesService,
                 private authService: AuthService
                 ) {
        this.validationMessages = {
            firstName: {
                required: 'Please enter your first name.'
            }
        }

    };  //constructor

    ngOnInit() {
        //createAccountForm is called
            //now we know the accountform is created
        //which calls getAccountData,
            //sets the model in code
            //now we know the country/state, if any
        //which calls loadPageData
            //patches the model values into the form, except for country/state
            //because states might not be listed yet for that country
        //which calls getStates
            //now have the states, so we can patch the country/state values into the form
        //(changeStateList) when user changes the country, it will:
            // this.model.country = country;  //so model picks up the new country
            // this.accountForm.patchValue({ state: ''}); //so form displays no state, but model still has it
            // calls getStates.

        this.createAccountForm();   //create account form
        this.watchFirstName();      //for validation msg
        this.watchErrors();         //if save generates errors, it shows here.
    }
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
        });
        this.getAccountData();
    }
    getAccountData() {
        this.model.accountId = +this.authService.currentUser.userId;
        console.log('update-account getAccountData accountId', this.model.accountId);
        this.adminService.getAccount(this.model.accountId)
            .pipe(
                takeWhile(() => this.componentActive),
                map(data => data)
            )
            .subscribe( (data: IAccount) => {
                console.log('getAccountData is back');
                this.model = data;
                this.loadPageData();
            })
    } //getAccountData

    loadPageData() {
        // console.log('loadPageData this.model', this.model);
        if (this.accountForm) {
            this.accountForm.reset();
        }

        // Update the data on the form
        this.accountForm.patchValue({
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            street1: this.model.street1,
            street2: this.model.street2,
            city: this.model.city,
            // state: this.model.state,
            // country: this.model.country,
            zip: this.model.zip,
        });
        this.getStates(this.model.country);

    } //loadPageData

    getStates(value: string) {
        value = value ? value : 'us';
        this.getStatesService.getStates(value)
            .pipe(
                take(1),
                map(data => data)
            )
            .subscribe( (data: string) => {
                this.stateList = JSON.parse(data);
                // console.log('this.stateList', this.stateList);
                // console.log('this.model.state', this.model.state);
                // console.log('this.model.country', this.model.country);
                // Update the data on the form
                this.accountForm.patchValue({
                    state: this.model.state,
                    country: this.model.country
                });
            })
    } //getStates



    watchAccount(): void {
        //onsave, wait for the save http call to return. When it does,
        //this will get triggered, so then navigate away
        this.store
            .pipe(
                    select(fromAdmin.getCurrentUser),
                    takeWhile(() => this.componentActive)
            )
            .subscribe(currentUser => {
                if(currentUser) {
                    console.log('update-account currentUser 1', JSON.stringify(currentUser));
                    if (this.isSaving) {  //isSaving is probably not necessary, but just to be sure
                        this.isSaving = false;
                        this.router.navigate(['/websites']);
                    }
                }
            })//subscribe
    }//watchAccount

    changeStateList(country: string) {
        console.log('country', country);
        this.model.country = country;
        this.accountForm.patchValue({ state: ''});
        this.getStates(country.toLocaleLowerCase());
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

    setMessage(c: AbstractControl, name: string): void {
        switch (name)   {
            case 'firstName':
                this.firstNameMsg = '';
                if ((c.touched || c.dirty) && c.errors) {
                    this.firstNameMsg = Object.keys(c.errors).map(key =>
                                this.validationMessages.firstName[key]).join(' ');
                }
                break;

        }
    } //setMessage

   watchErrors () {
        this.store
            .pipe(
                select(fromAdmin.getError),
                takeWhile(() => this.componentActive)
            )
            .subscribe(err => {
                if(err) {
                    this.popup = new Message('alert', 'Sorry, an error has occurred', "", 0);
                    this.store.dispatch(new adminActions.ClearCurrentError());
                }
            })

    }//watchForErrors

    saveIt(): void {
        //assume we have attached the accountId to the model Onit:
        if (this.model.accountId > 0) {
            this.isSaving = true;
            let info = {...this.model, ...this.accountForm.value};
            console.log('update-component savIt info', info);
            this.store.dispatch(new adminActions.UpdateAccount( info ));
        } else {
            this.popup = new Message('alert', 'Sorry, an error has occurred', "", 0);
        }
    };

    ngOnDestroy() {
        this.componentActive = false;
    }


}//class