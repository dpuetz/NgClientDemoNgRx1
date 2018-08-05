import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from '../admin/state/admin.reducer';
import { AdminEffects } from '../admin/state/admin.effects';
import { CreateAccountComponent } from './create-account.component';

const adminRoutes: Routes = [
  { path: 'create', component: CreateAccountComponent },
];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes),
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature(
      [ AdminEffects ]
    )

  ],
  declarations: [
    CreateAccountComponent
  ],
  providers: [
  ]
})
export class AdminModule { }