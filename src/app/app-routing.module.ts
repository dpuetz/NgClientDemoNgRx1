import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { AuthGuard } from './security/auth-guard.service';
import { UpdateAccountComponent } from './admin/update-account.component';
import { AdminEditGuard } from './admin/admin-guard.service';

const appRoutes: Routes  = [
    {
        path: '',
        component: ShellComponent,
        children: [
                { path: 'welcome', component: WelcomeComponent },
                {
                    path: 'websites',
                    canActivate: [ AuthGuard ],
                    loadChildren: './websites/websites.module#WebsitesModule'
                },
                {
                    path: 'update',
                    component: UpdateAccountComponent,
                    canActivate: [ AuthGuard ],
                    canDeactivate: [ AdminEditGuard ]
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
