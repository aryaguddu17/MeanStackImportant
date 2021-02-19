import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from '../Common-Layout.Component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../../../Services/master.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { RegistrationService } from '../../../../Services/registration.service';

@NgModule({
  imports: [
    CommonModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [CommonLayoutComponent],
  providers: [
    MasterService,
    RegistrationService
  ],
 
  exports: [ CommonLayoutComponent ]

})
export class SharedModuleModule { }
