import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../../errors.component";
import { RouterModule } from "@angular/router";
import { AppConfig } from "../../../../Globals/app.config"; 
import {  AuthenticationService } from '../../../../Services/authenticate.service';
import { Browser } from 'selenium-webdriver';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap';
import { InterviewListRoutes } from './InterviewList.routes';
import { InterviewListComponent } from '../InterviewList.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModuleModule } from '../../../Layouts/Secure/shared-module/shared-module.module';
import { RegistrationService } from '../../../../Services/registration.service';
import { MasterService } from '../../../../Services/master.service';
import { WalkinPostService } from '../../../../Services/walkinpost.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker'; 
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';
import { Ng5SliderModule } from 'ng5-slider';
import { DataTablesModule } from 'angular-datatables';
import { CandidateService } from '../../../../Services/candidate.service';
import {SharedModule} from '../../../../shared.module'
@NgModule({
  imports: [
    
              FormsModule,
              CommonModule,
              AccordionModule,   
              ReactiveFormsModule,
              ErrorsModule,
              RouterModule.forChild(InterviewListRoutes),
              NgxPaginationModule,
              BsDatepickerModule.forRoot(),
              Ng2SearchPipeModule,
              SharedModuleModule,
              Ng5SliderModule,
              DataTablesModule,
              SharedModule,
              TimepickerModule.forRoot(),
              AmazingTimePickerModule,
              ConfirmationPopoverModule.forRoot({
                confirmButtonType: 'danger' // set defaults here
              })
  ],
  declarations: [
    InterviewListComponent,//, ErrorsComponent
  
  ],
  providers: [ 
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    WalkinPostService,
    CandidateService
    
  ],
 // bootstrap: [AppComponent]
})
export class InterviewListModule { } 

