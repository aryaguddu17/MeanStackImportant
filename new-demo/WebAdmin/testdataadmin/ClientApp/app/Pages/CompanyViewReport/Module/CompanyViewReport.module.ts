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
import { CompanyViewReportRoutes } from './CompanyViewReport.routes';
import { CompanyViewReportComponent } from '../CompanyViewReport.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
@NgModule({
  imports: [
              FormsModule,
              CommonModule,
              AccordionModule,   
              ReactiveFormsModule,
              ErrorsModule,
              RouterModule.forChild(CompanyViewReportRoutes),
              NgxPaginationModule,
              Ng2SearchPipeModule,
              SharedModuleModule,
              ConfirmationPopoverModule.forRoot({
              confirmButtonType: 'danger' // set defaults here
              })
          ],
  declarations: [
    
    CompanyViewReportComponent,//, ErrorsComponent
    ],

  providers: [ 
    AppConfig,
    AuthenticationService,
  ],
 // bootstrap: [AppComponent]
})

export class CompanyViewReportModule { }

