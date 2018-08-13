import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { CreateAccountComponent } from '../admin/create-account.component';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from '../admin/state/admin.reducer';
import { AdminEffects } from '../admin/state/admin.effects';
import { AppComponent } from '../app.component';

// const userRoutes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'create', component: CreateAccountComponent }
// ];
const userRoutes: Routes = [
    {
        path: 'users',
        component: AppComponent,
        children: [
          {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'create',
                component: CreateAccountComponent
            }
        ]
    }

];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature(
      [ AdminEffects ]
    )
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  providers: [
  ]
})
export class SecurityModule { }