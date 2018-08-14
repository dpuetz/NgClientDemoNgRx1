import { Component, OnInit, OnDestroy } from '@angular/core';
import { Website, IWebsite } from './iwebsite'
import { ISearch, Search } from './ISearch';
import { IMessage, Message } from '../shared/IMessage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromWebsites from './state/website.reducer';
import * as websiteActions from './state/website.action';
import { takeWhile, tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    templateUrl: './websites.component.html'
})

export class WebsitesComponent implements OnInit, OnDestroy {

    websites: Website[];
    search: ISearch = new Search();
    recordsReturned: number = 0;
    popup : IMessage;
    searchForm: FormGroup;
    componentActive = true;
    navigateAfter: boolean;

    constructor( private fb: FormBuilder,
                 private store: Store<fromWebsites.State>,
                 private router: Router  ) { }

    ngOnInit() {
        //call this.getSearchParams() (just once on load)
        //which calls this.getWebsites()
        this.buildSearchForm();     //build the form
        this.getSearchParams();
        this.watchStoreWebsites();  //watch store for website list changes
        this.watchStoreErrors();    //watch store for errors
    }

    watchStoreErrors() {
        this.store
            .pipe(
                select(fromWebsites.getError),
                takeWhile(() => this.componentActive)
            )
            .subscribe(err => {
                console.log('err', JSON.stringify(err));
                if(err) {
                    this.store.dispatch(new websiteActions.ClearCurrentError());
                    this.showError();
                }
            })
    }//watchStoreErrors

    watchStoreWebsites(){
       this.store
            .pipe(
                    select(fromWebsites.getWebsites),
                    takeWhile(() => this.componentActive)
            )
            .subscribe(websites => {
                if (websites) {
                    this.websites = websites
                    this.recordsReturned = websites.length;
                    window.scrollTo(0, 0);
                }
            })
    } //watchStoreWebsites

    getSearchParams() {
            this.store
                .pipe(
                        select(fromWebsites.getSearchParams),
                        take(1)
                        // takeWhile(() => this.componentActive)
                )
                .subscribe(searchParams => {
                    if (searchParams) {
                        this.search = searchParams;
                    }
                    this.getWebsites();
                })//subscribe
    } //getSearchParams

    buildSearchForm() {
        this.searchForm = this.fb.group({
            searchWord: this.search.searchWord,
            isBill: this.search.isBill,
            isPreferred: this.search.isPreferred
        });
    }
    searchCheckboxChanged() {
        this.doCheckSearch();
    }

    doSearch(): void  {
        this.getWebsites();
    }

    doCheckSearch(): void   {
        //update display on form, and set searchword to ''
        this.searchForm.patchValue({
            searchWord: ''
        });
        // console.log('this.searchForm.get(searchWord).value 2', this.searchForm.get('searchWord').value);

        this.getWebsites();
    }

    setSearchParams(searchParams: ISearch) {
        this.store.dispatch(new websiteActions.SetSearchParams(searchParams));
    }

    getWebsites():void {
        let searchParams = {...this.search, ...this.searchForm.value};
        this.setSearchParams(searchParams);
        this.store.dispatch(new websiteActions.Load(searchParams));
    }//getWebsites

    goToSelectedWebsite(website: IWebsite): void {
        //update the store and navigate
        this.navigateAfter = true;
        if (website) {
            this.store.dispatch(new websiteActions.LoadCurrentWebsite(website.websiteID));
        } else {
            this.store.dispatch(new websiteActions.InitializeCurrentWebsite());
        }
        this.router.navigate(['/websites', 'detail']);
    }

    showError(): void{
        this.popup = new Message('alert', 'Sorry, an error has occurred.', "", 0);
    }
    ngOnDestroy() {
		this.componentActive = false;
	}


} //class
