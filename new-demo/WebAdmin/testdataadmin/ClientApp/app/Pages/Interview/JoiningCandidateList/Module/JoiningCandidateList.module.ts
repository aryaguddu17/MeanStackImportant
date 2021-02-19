import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorsModule } from "../../../../errors.component";
import { RouterModule } from "@angular/router";
import { AppConfig } from "../../../../Globals/app.config";
import { AuthenticationService } from '../../../../Services/authenticate.service';
import { Browser } from 'selenium-webdriver';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap';
import { JoiningCandidateListRoutes } from './JoiningCandidateList.routes';
import { JoiningCandidateListComponent } from '../JoiningCandidateList.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModuleModule } from '../../../Layouts/Secure/shared-module/shared-module.module';
import { RegistrationService } from '../../../../Services/registration.service';
import { MasterService } from '../../../../Services/master.service';
import { WalkinPostService } from '../../../../Services/walkinpost.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
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
    RouterModule.forChild(JoiningCandidateListRoutes),
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    Ng2SearchPipeModule,
    SharedModuleModule,
    Ng5SliderModule,
    DataTablesModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  declarations: [
    JoiningCandidateListComponent,//, ErrorsComponent

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
export class JoiningCandidateListModule { }

