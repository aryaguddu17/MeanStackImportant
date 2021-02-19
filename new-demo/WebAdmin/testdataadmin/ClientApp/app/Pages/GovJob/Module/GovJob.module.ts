import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '../../../errors.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedBootstrapModule } from '../../../shared-bootstrap.module';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { MasterService } from '../../../Services/master.service';
import { GovJobService } from '../../../Services/GovJob.service';
import { AppConfig } from '../../../Globals/app.config';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { AuthGuard } from '../../../Guards/auth.guard';
import { GovJobRoutes } from './GovJob.routes';
import { GovJobComponent } from '../GovJob.Component';
import { JobpostService } from '../../../Services/jobpost.service';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
import { ScreeningQuestionService } from '../../../Services/screeningQuestion.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {SharedModule} from '../../../shared.module';


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
    BsDatepickerModule,
    CKEditorModule,
    DatepickerModule,
    RouterModule.forChild(GovJobRoutes),
    SharedModule
  ],
  declarations: [
    GovJobComponent,
  ],
  providers: [
    UserInfoService,
    MasterService,
    GovJobService,
    AppConfig,
    AuthGuard,
    JobpostService,
    AuthenticationService,
    ScreeningQuestionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class GovJobModule { }

