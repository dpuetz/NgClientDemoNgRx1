import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { GetStatesService } from './shared/get-states-list.service';
import { take, map } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {  

    loading: boolean;
    userName: string = 'No UserName';

    constructor( private router:Router,
                private getStatesService: GetStatesService) {
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

    ngOnInit() {
        this.getStatesService.getStates('us')
            .pipe(
                take(1),
                map(data => data)
            )
            .subscribe( (data: string) => JSON.parse(data))
            // .subscribe( (data: string) => console.log('app.component ngOnInit', JSON.parse(data)));
    }


}//class

