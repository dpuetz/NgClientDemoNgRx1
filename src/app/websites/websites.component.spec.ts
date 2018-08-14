
//https://github.com/ngrx/platform/blob/master/docs/store/testing.md


import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
//component and it's injected services
import { WebsitesComponent } from './websites.component';
import { FormBuilder } from '@angular/forms';
import { Store, StoreModule  } from '@ngrx/store';
import * as fromWebsites from './state/website.reducer';
import { Routes, RouterModule, Router, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { reducer } from './state/website.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WebsiteEffects } from './state/websites.effects';
import { IWebsite } from './iwebsite';
import { ISearch, Search } from './isearch';
import { MessageComponent } from '../shared/message.component';
import { HttpClientModule } from '@angular/common/http';
import { Action } from "@ngrx/store";

import { AdminActions, AdminActionTypes } from '../admin/state/admin.actions';
import * as websiteActions from './state/website.action';
import { APP_BASE_HREF } from '@angular/common';


// import * as fromWebsites from './websites/state/website.reducer';
// doCheckSearch will set searchWord to ''
//console.log('this.searchForm.get(searchWord).value 2', this.searchForm.get('searchWord').value);



describe ('WebsitesComponent', () => {
    //fixture is a wrapper around the component, not the component itself
    let fixture: ComponentFixture<WebsitesComponent>
    let element: HTMLElement; //is a global type, does not need import
    let debugEl: DebugElement;
    let component: WebsitesComponent;
    let store: Store<fromWebsites.State>;
    let search: ISearch = new Search();
    //async allows a test to run synch that ususally runs async
    //needed for integrated tests
    //the building of the module is in this first beforeEach:
    //along with the TestBed
    beforeEach(async() => {
        // let mockStore: Store <fromWebsites.State>;
        // let mockRouter: Router;
        // let fb: FormBuilder;

        const routes: Routes = [
            {
                path: '',
                component: WebsitesComponent
            }
        ]
        TestBed.configureTestingModule({
            imports: [
                FormsModule, ReactiveFormsModule,
                HttpClientModule,
                RouterModule.forRoot(routes),
                RouterModule.forChild(routes),
                StoreModule.forRoot({}),
                StoreModule.forFeature('websites', reducer),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature(  [ WebsiteEffects ] )
            ],
            declarations: [ WebsitesComponent, MessageComponent ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'}
            ],
            schemas: []
        })
    })//TestBed.configureTestingModule

    // the next beforeEach is where we actually create the component
    beforeEach(() => {
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(WebsitesComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        fixture.detectChanges();

    }) //TestBed.createComponent

    describe('initial display', () => {
        // it('should be created', () => {
        //     expect (component).toBeTruthy();
        // })
        let w1 = <IWebsite>{websiteID: 1, websiteName: 'So Cal Gas'};
        let w2 = <IWebsite>{websiteID: 2, websiteName: 'Global pet food',};
        let websites = [w1, w2];

        //does work
        it('should have correct number of items after the data is loaded', () => {
                const action = new websiteActions.LoadSuccess(websites);
                store.dispatch(action);
                expect(component.websites.length).toBe(2);
        });

        //does not work
        // it('should display correct number of items after the data is loaded', () => {
        //     expect(element.querySelector('[recs]').textContent).toContain('2');
        //     expect (component.recordsReturned).toBe(2);
        // });

    }); //describe

//         //doesn't work, I get 2 actions in the result
//         it('should dispatch an action to set searchParams', () => {
//             // const action = new DataActions.LoadData();
//             const action = new websiteActions.SetSearchParams(search);
// // Expected spy dispatch to have been called with
// // [ [ SetSearchParams({ payload: Search({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }), Load({ payload: Search({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Load' }) ] ]
// // but actual calls were
// // [ SetSearchParams({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }) ], [ Load({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Load' }) ].
// // Error: Expected spy dispatch to have been called with
// // [ [ SetSearchParams({ payload: Search({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }), Load({ payload: Search({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Load' }) ] ] but actual calls were [ SetSearchParams({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }) ], [ Load({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Load' }) ].
// //Expected spy dispatch to have been called with
// //[ SetSearchParams({ payload: Search({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }) ]
// //but actual calls were
// //[ SetSearchParams({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Get Search Params' }) ], [ Load({ payload: Object({ searchWord: '', isBill: false, isPreferred: true }), type: '[Website] Load' }) ].

//             expect(store.dispatch).toHaveBeenCalledWith(action);
//         });
    // })

})//describe outer  WebsitesComponent



// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';
// //component and it's injected services
// import { WebsitesComponent } from './websites.component';
// import { FormBuilder } from '@angular/forms';
// import { Store, StoreModule  } from '@ngrx/store';
// import * as fromWebsites from './state/website.reducer';
// import { Routes, RouterModule, Router, Route } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { reducer } from './state/website.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { WebsiteEffects } from './state/websites.effects';
// import { IWebsite } from './iwebsite';
// import { ISearch, Search } from './isearch';
// import { MessageComponent } from '../shared/message.component';
// import { HttpClientModule } from '@angular/common/http';
// import { Action } from "@ngrx/store";

// import { AdminActions, AdminActionTypes } from '../admin/state/admin.actions';
// import { APP_BASE_HREF } from '@angular/common';


// // import * as fromWebsites from './websites/state/website.reducer';
// // doCheckSearch will set searchWord to ''
// //console.log('this.searchForm.get(searchWord).value 2', this.searchForm.get('searchWord').value);



// describe ('WebsitesComponent', () => {
//     //fixture is a wrapper around the component, not the component itself
//     let fixture: ComponentFixture<WebsitesComponent>
//     let element: HTMLElement; //is a global type, does not need import
//     let debugEl: DebugElement;
//     let component: WebsitesComponent;
//     //async allows a test to run synch that ususally runs async
//     //needed for integrated tests
//     //the building of the module is in this first beforeEach:
//     //along with the TestBed
//     beforeEach(async() => {
//         // let mockStore: Store <fromWebsites.State>;
//         // let mockRouter: Router;
//         // let fb: FormBuilder;
//         const routes: Routes = [
//             {
//                 path: '',
//                 component: WebsitesComponent
//             }
//         ]
//         TestBed.configureTestingModule({
//             imports: [
//                 FormsModule, ReactiveFormsModule,
//                 HttpClientModule,
//                 RouterModule.forRoot(routes),
//                 RouterModule.forChild(routes),
//                 StoreModule.forRoot({}),
//                 StoreModule.forFeature('websites', reducer),
//                 EffectsModule.forRoot([]),
//                 EffectsModule.forFeature(  [ WebsiteEffects ] )
//             ],
//             declarations: [ WebsitesComponent, MessageComponent ],
//             providers: [
//                 {provide: APP_BASE_HREF, useValue: '/'}
//             ],
//             schemas: []
//         })
//     })//TestBed.configureTestingModule

//     // the next beforeEach is where we actually create the component
//     beforeEach(() => {
//        fixture = TestBed.createComponent(WebsitesComponent);
//        component = fixture.componentInstance;
//        debugEl = fixture.debugElement;
//        element = fixture.nativeElement;
//     }) //TestBed.createComponent

//     describe('initial display', () => {
//         it('should have correct records number', () => {
//             // let search: ISearch = new Search();
//             let w1 = <IWebsite>{websiteID: 1, websiteName: 'So Cal Gas'};
//             let w2 = <IWebsite>{websiteID: 2, websiteName: 'Global pet food',};
//             component.websites = [w1, w2];
//             // I think this is what doesn't work.
//             //the component reads the websites list from the store.
//             //ngOnInit fires by itself here, but other methods will not.
//             //update the html by calling:
//             fixture.detectChanges();

//             //element = this element is the root level dom node.
//             //doesn't work, just get 0, although  it is reading the correct label.
//             expect(element.querySelector('[recs]').textContent).toContain('2');
//             //doesn't work, just get 0
//             // expect (component.recordsReturned).toBe(2);
//             //does work:
//             // expect(false).toBe(false);
//         })
//     })

// })//describe outer  WebsitesComponent
