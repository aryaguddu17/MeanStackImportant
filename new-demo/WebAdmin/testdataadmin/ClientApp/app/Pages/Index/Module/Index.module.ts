import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../errors.component";
import { RouterModule } from "@angular/router";
import { IndexRoutes } from "./Index.routes";
import { IndexComponent } from "../index.component"; 
import { AppConfig } from "../../../Globals/app.config"; 
import {  AuthenticationService } from '../../../Services/authenticate.service';
//import { Browser } from 'selenium-webdriver';
//import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule, TypeaheadModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from '../../../Services/registration.service';
import { LoginService } from '../../../Services/Login.service';
//import { MasterService } from '../../../Services/master.service';
import { NgxSelectModule } from 'ngx-select-ex';
//import { AppComponent } from '../../../app.component';
import { HttpModule } from '@angular/http';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    ErrorsModule,
    NgxSelectModule,
    TypeaheadModule,

    RouterModule.forChild(IndexRoutes )
  ],
  declarations: [
    IndexComponent,

  ],
  providers: [
    RegistrationService,
    LoginService,
    AppConfig,
    AuthenticationService,
    
  ],
 // bootstrap: [AppComponent]
})
export class IndexModule { }

