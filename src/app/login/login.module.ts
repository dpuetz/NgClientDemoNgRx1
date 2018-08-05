import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from '../admin/state/admin.reducer';
import { AdminEffects } from '../admin/state/admin.effects';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent },
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
    LoginComponent
  ],
  providers: [
  ]
})
export class LoginModule { }