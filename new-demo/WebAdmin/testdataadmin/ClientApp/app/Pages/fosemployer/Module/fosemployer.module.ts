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
import { FosEmployerRoutes } from './fosemployer.routes';
import { FosemployerComponent } from '../fosemployer.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FosService } from '../../../Services/fos.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    ErrorsModule,
    BsDatepickerModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forChild(FosEmployerRoutes)
  ],
  declarations: [
    FosemployerComponent,//, ErrorsComponent


  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    FosService
  ],
  bootstrap: [FosemployerComponent]
})
export class FosEmployerModule { }

