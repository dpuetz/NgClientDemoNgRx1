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
                 private getStatesService: GetStatesService
                 ) {
        this.validationMessages = {
            firstName: {
                required: 'Please enter your first name.'
            }
        }

    };  //constructor

    ngOnInit() {
        //createAccountForm calls getAccountID,
        //which calls getPageData,
        //which calls loadPageData
        this.createAccountForm();   //create account form
        this.watchFirstName();      //for validation msg
        // this.watchCountry();     //for validation msg why do this? TODO validation msg
        this.watchErrors();         //if save generates errors, it shows here.
        this.getStates('us');
    }

    // watchAccount(): void {
    //     //onload, get the accountID for the current user from the store and call loadPageData with it
    //     //onsave, wait for the save http call to return. when it does, navigate away
    //     this.store
    //         .pipe(
    //                 select(fromAdmin.getCurrentUser),
    //                 takeWhile(() => this.componentActive)
    //         )
    //         .subscribe(currentUser => {
    //             if(currentUser) {
    //                 // console.log('update-account currentUser 1', JSON.stringify(currentUser));
    //                 if (this.isSaving) {  //isSaving is probably not necessary, but just to be sure
    //                     this.isSaving = false;
    //                     this.router.navigate(['/websites']);
    //                 } else if (this.isLoading && currentUser.userId) {
    //                     this.isLoading = false;
    //                     this.model.accountId = currentUser.userId;
    //                     this.loadPageData(this.model.accountId);
    //                 }
    //             }
    //         })//subscribe
    // }//watchAccount
    // ngOnInit(): void {
    //     this.productService.getProducts()
    //             .subscribe(products => this.products = products,
    //                        error => this.errorMessage = <any>error);
    // }
//     getAccountID() {
    changeStateList(country: string) {
        this.accountForm.patchValue({ state: ''});
        this.getStates(country.toLocaleLowerCase());
    }
    getAccountID () {
        this.store
            .pipe(
                select(fromAdmin.getCurrentUserId),
                take(1)
            )
            .subscribe(accountID => {
                console.log('update-account getAccountID 1 accountID', accountID);
                if(accountID) {
                    console.log('update-account getAccountID 2 accountID', accountID);
                    this.model.accountId = accountID; //just to be sure
                    this.getPageData(accountID);
                } //accountID
            })//subscribe

    } //getAccountID

    getPageData(accountId: number) {
        console.log('update-account getPageData accountId', accountId);
        this.adminService.getAccount(accountId)
            .pipe(
                takeWhile(() => this.componentActive),
                map(data => data)
            )
            .subscribe( (data: IAccount) => this.loadPageData(data))
    } //loadPageData

    getStates(value: string) {
console.log('update-account getStates value', value);
       this.getStatesService.getStates(value)
            .pipe(
                take(1),
                map(data => data)
            )
            .subscribe( (data: string) => this.stateList = JSON.parse(data))
            // .subscribe( (data: string) => console.log('app.component ngOnInit', JSON.parse(data)));
console.log('update-account  getStates this.stateList', this.stateList);

    }

    loadPageData(accountInfo: IAccount) {
        console.log('update-account loadPageData 1 accountInfo', accountInfo);
        if (this.accountForm) {
            this.accountForm.reset();
        }
        this.model = accountInfo;
        // Update the data on the form
        this.accountForm.patchValue({
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            street1: this.model.street1,
            street2: this.model.street2,
            city: this.model.city,
            state: this.model.state,
            country: this.model.country,
            zip: this.model.zip,
        });

    } //loadPageData

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
        this.getAccountID();
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
    // watchCountry(): void {
    //     const usernameControl = this.accountForm.get('country');
    //     usernameControl.valueChanges
    //             .pipe(
    //                     takeWhile(() => this.componentActive)
    //             )
    //             .subscribe(value => {
    //                         console.log('country changed', value);
    //                     }
    //     );
    // }

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