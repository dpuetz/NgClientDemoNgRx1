import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AdminService } from '../app/admin/admin.service';
import { throwError, Observable, of } from "rxjs";
import { AuthService } from "./security/auth.service";
import { ICurrentUser, convertToCurrentUser, getGuestCurrentUserFromId } from "../app/admin/icurrent-user";
import { WebsiteService } from './websites/website.service';
import { ISearch, Search } from './websites/isearch';



// works
// describe ('first tests', () => {
//     it('should be true', () => {
//         expect(true).toBe(true)
//     })
// })

// works
// describe ('AdminService ', () => {
//     describe ('convertToCurrentUser', () => {
//         it('should set userName as Guest', () => {
//             let inAcct = { accountID: 12, firstName: '' };
//             var outAcct = getGuestCurrentUserFromId(inAcct);
//             expect(outAcct.userName).toBe('Guest');
//         })
//     }) // describe 1
// })  //outer describe

// works
// describe ('WebsiteService ', () => {
//     let websiteService: WebsiteService;
//     let mockHttp;
//     let search: ISearch = new Search();
//     search.isBill = true;
//     search.isPreferred = false;
//     search.searchWord = 'email';
//     beforeEach(() => {
//         mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'get', 'post']);
//         websiteService = new WebsiteService( mockHttp);
//     });
//     describe ('getWebsites', () => {
//             it('should call getWebsites with currect url', () => {
//             mockHttp.get.and.returnValue(of(false));
//             websiteService.getWebsites(search);
//             //call is done this way:  .get<HttpResponse<IWebsite[]>>(url, {headers, params, observe: 'response' })
//             //want to test just the url not the second param, so use jasmine.any(Object)
//             expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:5500/api/websitesearch/false/true', jasmine.any(Object));
//         })
//     }) // describe 1
// })  //outer describe

// really doesn't work
// describe ('AdminService ', () => {
//     let adminService: AdminService;
//     let mockHttp;
//     let authService: AuthService;
//     let curUser: ICurrentUser;
//     beforeEach(() => {
//         mockHttp = jasmine.createSpyObj('mockHttp', ['put', 'get', 'post']);
//         adminService = new AdminService( mockHttp, authService);
//     });
//     describe ('createAccount', () => {
//         it('should return an ICurrentUser', () => {
//             var login = {username: 'sue', password: 'asdf'};
//             // mockHttp.post.and.returnValue(of(curUser));
//             adminService.createAccount(login)
//                 .subscribe( (value:ICurrentUser) => {
//                     expect(value.userName).toBe('Guest');
//                 });

//         })
//     }) // describe 1
// })  //outer describe


// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to NgClientDemoNgRx!');
//   }));
// });
