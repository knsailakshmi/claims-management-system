import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { SignupComponent } from './signup/signup.component';
import { MemberportalComponent } from './memberportal/memberportal.component';
import { SubmitclaimComponent } from './submitclaim/submitclaim.component';
import { UpdatememComponent } from './updatemem/updatemem.component';
import { ClaimsstatusComponent } from './claimsstatus/claimsstatus.component';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { ProcessclaimComponent } from './processclaim/processclaim.component';
import { FooterComponent } from './footer/footer.component';


import { authInterceptorProviders } from './_helper/auth-interceptor.interceptor';

import { ViewclaimComponent } from './viewclaim/viewclaim.component';
 import {DatePipe} from "@angular/common";
import { ViewmemberComponent } from './viewmember/viewmember.component';
import { AuthGuard } from './_guard/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    MemberportalComponent,
    SubmitclaimComponent,
    UpdatememComponent,
    ClaimsstatusComponent,
    AdminportalComponent,
    ProcessclaimComponent,
    FooterComponent,
    ViewclaimComponent,
    ViewmemberComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,
    ReactiveFormsModule],
  providers: [authInterceptorProviders,DatePipe,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
