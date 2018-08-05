import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { WebsitesComponent } from './websites.component';
import { WebsiteDetailComponent } from './website-detail.component';
import { PurchaseComponent } from './purchase.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { AngularFontAwesomeModule } from 'angular-font-awesome';  //https://fontawesome.com/how-to-use/svg-with-js
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/website.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WebsiteEffects } from './state/websites.effects';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};

const routes: Routes = [
        {
            path: '',
            component: WebsitesComponent
        },
        {
            path: 'detail',
            component: WebsiteDetailComponent,
        },
        {
            path: 'purchase',
            component: PurchaseComponent
        }
]

@NgModule({
imports: [
    CurrencyMaskModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgTempusdominusBootstrapModule,
    // A2Edatetimepicker,
    // NgbModule.forRoot(),
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('websites', {}),
    StoreModule.forFeature('websites', reducer),  //1st arg is slice, 2nd is reducer or reducers.
    EffectsModule.forFeature(
      [ WebsiteEffects ]
    )
  ],
  declarations: [
    WebsitesComponent,
    WebsiteDetailComponent,
    PurchaseComponent
  ],

  providers: [
    {
        provide: CURRENCY_MASK_CONFIG,
        useValue: CustomCurrencyMaskConfig,
    }
]

})
export class WebsitesModule { }
