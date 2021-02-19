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
import { regisrationRoutes } from './regisration.routes';
import { RegistrationComponent } from '../registration.component';
import { RegistrationService } from '../../../Services/registration.service';
import { MasterService } from '../../../Services/master.service';
import { BlockCopyPasteDirective } from "../../../block-copy-paste.directive";
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    //  BrowserModule,
    ReactiveFormsModule,
    ErrorsModule,
    RouterModule.forChild(regisrationRoutes),
    NgMultiSelectDropDownModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  declarations: [
    RegistrationComponent,//, ErrorsComponent
    BlockCopyPasteDirective
  ],
  providers: [
    AppConfig,
    AuthenticationService,
    RegistrationService,
    MasterService,
  ],
  // bootstrap: [AppComponent]
})
export class RegisrationModule { }

