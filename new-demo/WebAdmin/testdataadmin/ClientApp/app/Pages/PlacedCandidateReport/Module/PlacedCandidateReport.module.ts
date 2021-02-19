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
import { PlacedCandidateReportRoutes } from './PlacedCandidateReport.routes';
import { PlacedCandidateReportComponent } from '../PlacedCandidateReport.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../../shared.module';
import { CandidateService } from '../../../Services/candidate.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { TestimonialsService } from '../../../Services/Testimonials.service';
import { DataTableModule } from 'primeng/datatable';
import { CommonViewLayoutModule } from '../../CommonModelView/Module/CommonViewLayout.module';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    ReactiveFormsModule,
    ErrorsModule,
    RouterModule.forChild(PlacedCandidateReportRoutes),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    SharedModule,
    BsDatepickerModule,
    DatepickerModule, //bssdatepicker
    DataTableModule,
    CommonViewLayoutModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })

  ],

  declarations: [

    PlacedCandidateReportComponent,//, ErrorsComponent

  ],

  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    CandidateService,
    TestimonialsService

  ],
  // bootstrap: [AppComponent]
})

export class PlacedCandidateReportModule { }

