import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

const appRoutes: Routes  = [
    {
        path: '',
        component: ShellComponent,
        children: [
                { path: 'welcome', component: WelcomeComponent },
                {
                    path: 'websites',
                    loadChildren: './websites/websites.module#WebsitesModule'
                },
                { path: '', redirectTo: '/welcome', pathMatch: 'full'},
        ]
    },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }