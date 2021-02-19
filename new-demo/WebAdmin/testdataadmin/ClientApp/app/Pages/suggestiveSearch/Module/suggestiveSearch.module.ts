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
import { SuggestiveSearchRoutes } from './suggestiveSearch.routes';
import {SuggestiveSearchComponent } from '../suggestiveSearch.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import { Ng5SliderModule } from 'ng5-slider';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
  //  BrowserModule,
  Ng5SliderModule,
  BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ErrorsModule,
    RouterModule.forChild(SuggestiveSearchRoutes),
    SharedModuleModule,
  ],
  declarations: [
    SuggestiveSearchComponent,//, ErrorsComponent
  
  ],
  providers: [ 
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
    
  ],
 // bootstrap: [AppComponent]
})
export class SuggestiveSearchModule { } 

