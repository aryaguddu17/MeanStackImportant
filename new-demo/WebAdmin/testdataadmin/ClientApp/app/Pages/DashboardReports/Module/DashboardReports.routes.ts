import { Routes, RouterModule } from '@angular/router'; 
import { AuthGuard } from '../../../Guards/auth.guard';
import { DashboardReportsComponent } from '../DashboardReports.Component';

export const DashboardReportsRoutes: Routes = [ 
  { path: '', component: DashboardReportsComponent},
    // { path: 'DashboardReports', component: DashboardReportsComponent}
];
