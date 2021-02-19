import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../errors.component";
import { RouterModule } from "@angular/router";
import { AppConfig } from "../../../Globals/app.config";
import { AuthenticationService } from '../../../Services/authenticate.service';
import { Browser } from 'selenium-webdriver';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap';
import { UserManagementRoutes } from './fos.routes';
import { FosComponent } from '../fos.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FosService } from '../../../Services/fos.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    ErrorsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forChild(UserManagementRoutes)
  ],
  declarations: [
    FosComponent,//, ErrorsComponent


  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    FosService
  ],
  bootstrap: [FosComponent]
})
export class FosModule { }

