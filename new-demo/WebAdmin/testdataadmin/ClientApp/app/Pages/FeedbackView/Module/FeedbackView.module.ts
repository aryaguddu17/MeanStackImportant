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
import { FeedbackViewRoutes } from './FeedbackView.routes';
import {FeedbackViewComponent } from '../FeedbackView.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
              FormsModule,
              CommonModule,
              AccordionModule,   
              ReactiveFormsModule,
              ErrorsModule,
              RouterModule.forChild(FeedbackViewRoutes),
              NgxPaginationModule,
              Ng2SearchPipeModule,
              SharedModuleModule,
              BsDatepickerModule,
              DatepickerModule,
              
              ConfirmationPopoverModule.forRoot({
                confirmButtonType: 'danger' // set defaults here
              })
          ],
  declarations: [
    
    FeedbackViewComponent,//, ErrorsComponent
    ],

  providers: [ 
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    
  ],
 // bootstrap: [AppComponent]
})

export class FeedbackViewModule { }

