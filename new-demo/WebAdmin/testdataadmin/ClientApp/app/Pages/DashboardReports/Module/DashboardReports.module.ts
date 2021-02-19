import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '../../../errors.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedBootstrapModule } from '../../../shared-bootstrap.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../Guards/auth.guard';
import { AppConfig } from '../../../Globals/app.config';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { CookieService } from 'ngx-cookie-service';
import { MasterService } from '../../../Services/master.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { DashboardReportsComponent } from '../DashboardReports.Component';
import { DashboardReportsRoutes } from './DashboardReports.routes';
import { SecureLayoutComponent } from '../../Layouts/Secure/Secure-Layout.Component';
import { SecureHeaderComponent } from '../../Layouts/Secure/Header/Secure-Header.Component';
import { SecureFooterComponent } from '../../Layouts/Secure/Footer/Secure-Footer.Component';
import { ProfileSidebar } from '../../Layouts/Secure/Sidebar/Profile-SideBar.Component';
import { LeftSidebar } from '../../Layouts/Secure/Sidebar/Left-Sidebar.Component';
import { DashboardReportsService } from '../../../Services/dashboardReports.service';
import { DataTableModule } from 'primeng/datatable';
import { CandidateService } from '../../../Services/candidate.service';

import { CommonViewLayoutModule } from '../../CommonModelView/Module/CommonViewLayout.module';

@NgModule({

  imports: [
    FormsModule,
    ErrorsModule,
    InfiniteScrollModule,
    NgxContentLoadingModule,
    ReactiveFormsModule,
    DataTablesModule,
    DataTableModule,
    CollapseModule.forRoot(),
    ImageCropperModule,
    SharedBootstrapModule,
    RouterModule.forChild(DashboardReportsRoutes),
    CommonModule,
    CommonViewLayoutModule
  ],
  declarations: [
    DashboardReportsComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserInfoService,
    CookieService,
    MasterService,
    DashboardReportsService,
    CandidateService
  ],

})
export class DashboardReportsModule { }

