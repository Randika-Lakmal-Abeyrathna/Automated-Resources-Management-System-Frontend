import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthRouteGuard} from "./guards/auth.route.guard";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {SuperAdminDashboardComponent} from "./components/super-admin-dashboard/super-admin-dashboard.component";
import {SchoolDetailsComponent} from "./components/school-details/school-details.component";
import {
  ApproveUserUpdateDetailsComponent
} from "./components/approve-user-update-details/approve-user-update-details.component";
import {DataentryDashboardComponent} from "./components/dataentry-dashboard/dataentry-dashboard.component";
import { AdminApproveRequestComponent } from './components/admin-approve-request/admin-approve-request.component';
import { TeacherRegistrationComponent } from './components/teacher-registration/teacher-registration.component';
import { TeacherRequestComponent } from './components/teacher-request/teacher-request.component';
import { SchoolRegistrationComponent } from './components/school-registration/school-registration.component';
import { TeacherOnboardComponent } from './components/teacher-onboard/teacher-onboard.component';
import { SuperAdminApproveRequestComponent } from './components/super-admin-approve-request/super-admin-approve-request.component';
import { DeniedComponent } from './components/denied/denied.component';


const routes: Routes = [
  {
    path: "register", component: UserRegistrationComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "login", component: LoginComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "forgot", component: ForgotPasswordComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "dashboard", component: DashboardComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "admin", component: AdminDashboardComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "superadmin", component: SuperAdminDashboardComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "schooldetail", component: SchoolDetailsComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "teacherupdate", component: ApproveUserUpdateDetailsComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "teacherRegistration", component: TeacherRegistrationComponent,
    canActivate: [AuthRouteGuard]
  },

  {
    path: "teacherRequest", component: TeacherRequestComponent,
    canActivate: [AuthRouteGuard]
  },
  {

    path: "dataentry", component: DataentryDashboardComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: "schoolRegistration", component: SchoolRegistrationComponent,
    canActivate: [AuthRouteGuard]
  },

  {
    path:"admin-approve/:id",component:AdminApproveRequestComponent,
    canActivate:[AuthRouteGuard]
  },
  {
    path:"super-admin-approve/:id",component:SuperAdminApproveRequestComponent,
    canActivate:[AuthRouteGuard]
  },
  {
    path:"teacher-onboard",component:TeacherOnboardComponent,
    canActivate:[AuthRouteGuard]
  },
  {
    path:"denied",component:DeniedComponent
  },

  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "**", component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
