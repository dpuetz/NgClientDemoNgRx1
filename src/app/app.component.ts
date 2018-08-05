import { Component, AfterContentInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {  // implements AfterContentInit

    loading: boolean;
    userName: string = 'No UserName';

    constructor( private router:Router) {
        router.events.subscribe(
            (routerEvent: Event) => {
                this.checkRouterEvent(routerEvent);
            }
        );  // subscribe
    } //constructor

    onComplete(firstName: string): void {
        this.userName = firstName;
    }

    checkRouterEvent(routerEvent: Event) : void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if  (routerEvent instanceof NavigationEnd ||
             routerEvent instanceof NavigationCancel  ||
             routerEvent instanceof NavigationError ) {

                this.loading = false;
            }

    }//checkRouterEvent


}//class

