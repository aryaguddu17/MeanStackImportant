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
import {CreateEventTypeRoutes } from './CreateEventType.routes';
import {CreateEventTypeComponent } from '../CreateEventType.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CreateEventTypeService } from '../../../Services/CreateEventType.service';
import { DataTablesModule } from 'angular-datatables';
import {DataTableModule} from 'primeng/datatable';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    DataTablesModule,
    //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forChild(CreateEventTypeRoutes),
    DataTableModule
  ],
  declarations: [
    CreateEventTypeComponent,//, ErrorsComponent


  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    CreateEventTypeService,
    MasterService,

  ],
  bootstrap: [CreateEventTypeComponent]
})
export class CreateEventTypeModule { }

