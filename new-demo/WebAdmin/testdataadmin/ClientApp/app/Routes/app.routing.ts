import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from '../Pages/Layouts/Public/Public-Layout.Component';
import { SecureLayoutComponent } from '../Pages/Layouts/Secure/Secure-Layout.Component';
import { AuthGuard } from '../Guards/auth.guard';
import { DashBoardComponent } from '../Pages/DashBoard/DashBoard.Component';
import { RegistrationComponent } from '../Pages/Regisration/registration.component';
const routes: Routes = [
  { path: '', loadChildren: '../Pages/Index/Module/Index.module#IndexModule' },
  { path: 'index', loadChildren: '../Pages/Index/Module/Index.module#IndexModule' },

  {
    path: 'AddEditRole', component: SecureLayoutComponent, loadChildren: '../Pages/Administration/AddEditRole/Module/addEditRole.module#AddEditRoleModule',
  },
  {
    path: 'Register', component: SecureLayoutComponent, loadChildren: '../Pages/Regisration/Module/regisration.module#RegisrationModule',
  },
  {
    path: 'Companyprofile', component: SecureLayoutComponent, loadChildren: '../Pages/CompanyProfile/Module/CompanyProfile.module#CompanyProfileModule',
  },
  {
    path: 'Companyview', component: SecureLayoutComponent, loadChildren: '../Pages/CompanyView/Module/CompanyView.module#CompanyViewModule',
  },
  {
    path: 'Feedbackview', component: SecureLayoutComponent, loadChildren: '../Pages/FeedbackView/Module/FeedbackView.module#FeedbackViewModule',
  },
  // {
  //   path: 'RegistrationView',component: SecureLayoutComponent, loadChildren: '../Pages/RegistrationView/Module/RegistrationView.module#RegistrationViewModule',
  // },

  {
    path: 'CreateJob', component: SecureLayoutComponent, loadChildren: '../Pages/CreateJob/Module/CreateJob.module#CreateJobsModule',
  },
  // canActivate: [AuthGuard],
  {
    path: 'JobList', component: SecureLayoutComponent, loadChildren: '../Pages/JobList/Module/JobList.module#JobListModule',
  },

  {
    path: 'ViewJob', component: SecureLayoutComponent, loadChildren: '../Pages/ViewJob/Module/ViewJob.module#ViewJobModule',
  },

  {
    path: 'GovJob', component: SecureLayoutComponent, loadChildren: '../Pages/GovJob/Module/GovJob.module#GovJobModule',
  },

  {
    path: 'Report', component: SecureLayoutComponent, loadChildren: '../Pages/Report/Module/Report.module#ReportModule',
  },
  {
    path: 'CompanyVerify', component: SecureLayoutComponent, loadChildren: '../Pages/CompanyVerify/Module/CompanyVerify.module#CompanyVerifyModule',
  },
  {
    path: 'WalkinList', component: SecureLayoutComponent, loadChildren: '../Pages/Walkin/WalkinList/Module/WalkinList.module#WalkinListModule',
  },

  {
    path: 'CreateWalkins', component: SecureLayoutComponent, loadChildren: '../Pages/Walkin/CreateWalkin/Module/CreateWalkin.module#CreateWalkinsModule',
  },
  {
    path: 'UserManagement', component: SecureLayoutComponent, loadChildren: '../Pages/UserManagement/Module/UserManagement.module#UserManagementModule',
  },

  {
    path: 'ScreeningQuestion', component: SecureLayoutComponent, loadChildren: '../Pages/ScreeningQuestion/Module/ScreeningQuestion.module#ScreeningQuestionModule',
  },

  {
    path: 'viewwalkin', component: SecureLayoutComponent, loadChildren: '../Pages/Walkin/ViewWalkIn/Module/ViewWalkIn.module#ViewWalkInModule',
  },

  {
    path: 'CompanyDetails', component: SecureLayoutComponent, loadChildren: '../Pages/CompanyDetails/Module/CompanyDetails.module#CompanyDetailsModule',
  },
  {
    path: 'CompanyReport', component: SecureLayoutComponent, loadChildren: '../Pages/CompanyViewReport/Module/CompanyViewReport.module#CompanyViewReportModule',
  },
  {
    path: 'SuscribeUser', component: SecureLayoutComponent, loadChildren: '../Pages/SuscribeUser/Module/SuscribeUser.module#SuscribeUserModule',
  },
  {
    path: 'InterviewList', component: SecureLayoutComponent, loadChildren: '../Pages/Interview/InterviewList/Module/InterviewList.module#InterviewListModule',
  },
  {
    path: 'updateinterview', component: SecureLayoutComponent, loadChildren: '../Pages/Interview/UpdateInterview/Module/UpdateInterview.module#UpdateInterviewModule',
  },
  {
    path: 'SelectedCandidateList', component: SecureLayoutComponent, loadChildren: '../Pages/Interview/SelectedCandidateList/Module/SelectedCandidateList.module#SelectedCandidateListModule',
  },
  {
    path: 'OfferLetterList', component: SecureLayoutComponent, loadChildren: '../Pages/Interview/OfferLetterList/Module/OfferLetterList.module#OfferLetterListModule',
  },
  {
    path: 'JoiningCandidateList', component: SecureLayoutComponent, loadChildren: '../Pages/Interview/JoiningCandidateList/Module/JoiningCandidateList.module#JoiningCandidateListModule',
  },


  {
    path: 'applicationreceived', component: SecureLayoutComponent, loadChildren: '../Pages/ApplicationReceived/Module/ApplicationReceived.module#ApplicationReceivedModule'
  },
  {
    path: 'ReviewApplication', component: SecureLayoutComponent, loadChildren: '../Pages/ReviewApplication/Module/ReviewApplication.module#ReviewApplicationModule'
  },
  {
    path: 'suggestivesearch', component: SecureLayoutComponent, loadChildren: '../Pages/suggestiveSearch/Module/suggestiveSearch.module#SuggestiveSearchModule',
  },

  {
    path: 'fos', component: SecureLayoutComponent, loadChildren: '../Pages/fos/Module/fos.module#FosModule',
  },

  {
    path: 'statewisereport', component: SecureLayoutComponent, loadChildren: '../Pages/statewisereport/Module/statewisereport.module#Statewisereport',
  },

  {
    path: 'companywisejobs', component: SecureLayoutComponent, loadChildren: '../Pages/companywisereport/Module/companywisereport.module#CompanyWisejobs',
  },

  {
    path: 'PredictiveSearch', component: SecureLayoutComponent,
    loadChildren: '../Pages/Predictive/Module/PredictiveSearch.module#PredictiveSearchModule'
  },


  {
    path: 'fosemployer', component: SecureLayoutComponent, loadChildren: '../Pages/fosemployer/Module/fosemployer.module#FosEmployerModule',
  },

  {
    path: 'TCSearch', component: SecureLayoutComponent,
    loadChildren: '../Pages/TCSearch/Module/TCSearch.module#TCSearchModule'

  },

  {
    path: 'AgentReport', component: SecureLayoutComponent,
    loadChildren: '../Pages/AgentReport/Module/AgentReport.module#AgentReportModule'

  },

  {
    path: 'PlacedCandidate', component: SecureLayoutComponent,
    loadChildren: '../Pages/PlacedCandidateReport/Module/PlacedCandidateReport.module#PlacedCandidateReportModule'

  },

  {
    path: 'RojggarMela', component: SecureLayoutComponent,
    loadChildren: '../Pages/RojggarMela/Module/RojggarMela.module#RojggarMelaModule'

  },
  {
    path: 'CreateEvents', component: SecureLayoutComponent,
    loadChildren: '../Pages/CreateEvent/Module/CreateEvent.module#CreateEventModule'

  },

  {
    path: 'Events', component: SecureLayoutComponent,
    loadChildren: '../Pages/Events/Module/Events.module#EventsModule'

  },

  {
    path: 'EventsGallery', component: SecureLayoutComponent,
    loadChildren: '../Pages/EventsGallery/Module/EventsGallery.module#EventsGalleryModule'

  },

  {
    path: 'EventsCandidate', component: SecureLayoutComponent,
    loadChildren: '../Pages/EventsCandidate/Module/EventsCandidate.module#EventsCandidateModule'

  },



  {
    path: 'CreateEventType', component: SecureLayoutComponent,
    loadChildren: '../Pages/CreateEventType/Module/CreateEventType.module#CreateEventTypeModule'

  },

  {
    path: 'Testimonials', component: SecureLayoutComponent, loadChildren: '../Pages/Testimonials/Module/Testimonials.module#TestimonialsModule',
  },

  {
    path: 'OfferletterReleased', component: SecureLayoutComponent, loadChildren: '../Pages/OfferletterReleased/Module/OfferletterReleased.module#OfferletterReleasedModule',
  },
  {
    path: 'DashboardReports', component: SecureLayoutComponent,
    loadChildren: '../Pages/DashboardReports/Module/DashboardReports.module#DashboardReportsModule'

  },
  {
    path: 'Dashboard',
    component: SecureLayoutComponent,
    children: [
      { path: '', component: DashBoardComponent, },
    ],
  },
  { pathMatch: 'full', path: '**', redirectTo: 'index' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

