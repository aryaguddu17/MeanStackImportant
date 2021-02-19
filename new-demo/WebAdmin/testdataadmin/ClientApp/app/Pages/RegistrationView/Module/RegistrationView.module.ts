import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../errors.component";
import { RouterModule } from "@angular/router";
import { AppConfig } from "../../../Globals/app.config"; 
import {  AuthenticationService } from '../../../Services/authenticate.service';
import { Browser } from 'selenium-webdriver';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap';
import { RegistrationViewRoutes } from './RegistrationView.routes';
import {RegistrationViewComponent } from '../RegistrationView.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
  //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    RouterModule.forChild(RegistrationViewRoutes)
  ],
  declarations: [
    RegistrationViewComponent,//, ErrorsComponent
  
  ],
  providers: [ 
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    
  ],
 // bootstrap: [AppComponent]
})
export class RegistrationViewModule { } 

