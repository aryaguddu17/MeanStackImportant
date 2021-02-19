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
import { TestimonialsRoutes } from './Testimonials.routes';
import { TestimonialsComponent } from '../Testimonials.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UserManagementService } from '../../../Services/UserManagement.service';
import { TestimonialsService } from '../../../Services/Testimonials.service';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forChild(TestimonialsRoutes)
  ],
  declarations: [
    TestimonialsComponent,//, ErrorsComponent


  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    UserManagementService,
    TestimonialsService,
    MasterService,

  ],
  bootstrap: [TestimonialsComponent]
})
export class TestimonialsModule { }

