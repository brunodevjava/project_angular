import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {registerLocaleData} from "@angular/common";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoaderComponent } from './components/loader/loader/loader.component';
import {ApiService} from "./services/api.service";
import {Interceptor} from "./guards/interceptor";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
registerLocaleData(localePt);

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } },
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
