import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '../../../errors.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedBootstrapModule } from '../../../shared-bootstrap.module';
import { DefaultImage } from '../../../Directives/error.image.directive';
import { ReadMoreDirective } from '../../../Directives/read-more.directive';
import { ThumbnailDirective } from '../../../Directives/thumbnail.directive';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { MasterService } from '../../../Services/master.service';
import { AppConfig } from '../../../Globals/app.config';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { AuthGuard } from '../../../Guards/auth.guard';
import { ApplicationReceivedComponent } from '../ApplicationReceived';
import { ApplicationReceivedRoutes } from './ApplicationReceived.routes';
import { JobpostService } from '../../../Services/jobpost.service';
import { TypeaheadModule } from 'ngx-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { SharedModuleModule } from '../../Layouts/Secure/shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { DataTablesModule } from 'angular-datatables';
import { CandidateService } from '../../../Services/candidate.service';
import {SharedModule} from '../../../shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ErrorsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TypeaheadModule,
    Ng5SliderModule,
    SharedBootstrapModule,
    RouterModule.forChild(ApplicationReceivedRoutes),
    BsDatepickerModule.forRoot(),
    SharedModuleModule,
    NgxPaginationModule,
    DataTablesModule,
    SharedModule
  ],
  declarations: [
    ApplicationReceivedComponent,
  ],
  providers: [
    UserInfoService,
    AppConfig,
    AuthGuard,
    JobpostService,
    AuthenticationService,
    WalkinPostService,
    CandidateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ApplicationReceivedModule { }

