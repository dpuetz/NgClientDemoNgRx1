import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';  //https://fontawesome.com/how-to-use/svg-with-js
import { RouterModule, PreloadAllModules } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginModule } from './login/login.module';
import { MenuComponent } from './home/menu.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { AdminModule } from './admin/admin.module';
// import { LoginComponent } from './login/login.component';
// import { MessageComponent } from './shared/message.component';

// import { CreateAccountComponent } from './user/create-account.component';

const appRoutes  = [
    {
        path: '',
        component: ShellComponent,
        children: [
                { path: 'welcome', component: WelcomeComponent },
                {
                    path: 'websites',
                    loadChildren: './websites/websites.module#WebsitesModule'
                },
                // { path: 'login', component: LoginComponent },
                // { path: 'create', component: CreateAccountComponent },
                { path: 'welcome', component: WelcomeComponent },
                // {
                //     path: 'user',
                //     loadChildren: './user/user.module#UserModule'
                // },
                { path: '', redirectTo: '/welcome', pathMatch: 'full'},
        ]
    },
     { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    SharedModule,
    // FormsModule,
    // ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    LoginModule,
    AdminModule,
    RouterModule.forRoot(appRoutes,  {preloadingStrategy: PreloadAllModules} ),
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    PageNotFoundComponent,
    ShellComponent,
    WelcomeComponent,
    // LoginComponent,
    // MessageComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

