import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../errors.component";
import { RouterModule } from "@angular/router";
import { AppConfig } from "../../../Globals/app.config";
import { AuthenticationService } from '../../../Services/authenticate.service';
// import { Browser } from 'selenium-webdriver';
// import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap';
import { UserManagementRoutes } from './UserManagement.routes';
import { UserManagementComponent } from '../UserManagement.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UserManagementService } from '../../../Services/UserManagement.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    RouterModule.forChild(UserManagementRoutes)
  ],
  declarations: [
    UserManagementComponent,


  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    UserManagementService,
    MasterService,

  ],
  bootstrap: [UserManagementComponent]
})
export class UserManagementModule { }

