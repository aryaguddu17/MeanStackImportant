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
import { CompanyProfileRoutes } from './CompanyProfile.routes';
import { CompanyProfileComponent } from '../CompanyProfile.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
//import { BlockCopyPasteDirective } from "../../../block-copy-paste.directive";

// import { CompanyProfileService } from '../../../Services/companyprofile.service';
// import { CompanyProfileService } from '../Services/companyprofile.service';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    SharedModuleModule,
  //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    RouterModule.forChild(CompanyProfileRoutes),
    
  ],
  declarations: [
    CompanyProfileComponent,//, ErrorsComponent  
   // BlockCopyPasteDirective
  ],
  providers: [ 
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    // CompanyProfileService
    
  ],
 // bootstrap: [AppComponent]
})
export class CompanyProfileModule { }

