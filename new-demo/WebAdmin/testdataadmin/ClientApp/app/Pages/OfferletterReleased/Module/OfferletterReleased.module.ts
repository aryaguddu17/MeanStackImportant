import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '../../../errors.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedBootstrapModule } from '../../../shared-bootstrap.module';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { MasterService } from '../../../Services/master.service';
import { AppConfig } from '../../../Globals/app.config';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { AuthGuard } from '../../../Guards/auth.guard';
import { OfferletterReleasedRoutes } from './OfferletterReleased.routes';
import { OfferletterReleasedComponent } from '../OfferletterReleased.Component';
import { JobpostService } from '../../../Services/jobpost.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
import { ScreeningQuestionService } from '../../../Services/screeningQuestion.service';
//import { GeolocationComponent } from '../../GeoLocation/Geolocation.Component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';
import { EventService } from '../../../Services/Event.service';
import { DataTableModule } from 'primeng/datatable';
import { OfferletterReleasedService } from '../../../Services/OfferletterReleased.service';
import { CommonViewLayoutModule } from '../../CommonModelView/Module/CommonViewLayout.module';
import { CandidateService } from '../../../Services/candidate.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ErrorsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    SharedBootstrapModule,
    NgMultiSelectDropDownModule,
    Ng5SliderModule,
    SharedModuleModule,
    BsDatepickerModule,//bsdatepicker
    DatepickerModule, //bssdatepicker
    RouterModule.forChild(OfferletterReleasedRoutes),
    TimepickerModule.forRoot(),
    DataTableModule,
    AmazingTimePickerModule,
    CommonViewLayoutModule
  ],
  declarations: [
    OfferletterReleasedComponent,
    //  GeolocationComponent

  ],
  providers: [
    UserInfoService,
    MasterService,
    AppConfig,
    AuthGuard,
    JobpostService,
    AuthenticationService,
    ScreeningQuestionService,
    OfferletterReleasedService,
    EventService,
    CandidateService
    // ,ProfileSidebar,
    // LeftSidebar,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OfferletterReleasedModule { }

