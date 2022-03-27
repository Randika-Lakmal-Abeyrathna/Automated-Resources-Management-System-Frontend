import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginServiceService} from "./service/login-service.service";
import {AuthRouteGuard} from "./guards/auth.route.guard";
import {ToastrModule} from "ngx-toastr";
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { ApproveUserUpdateDetailsComponent } from './components/approve-user-update-details/approve-user-update-details.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { TeacherRegistrationComponent } from './components/teacher-registration/teacher-registration.component';
import { DataentryDashboardComponent } from './components/dataentry-dashboard/dataentry-dashboard.component';
import { TeacherRequestComponent } from './components/teacher-request/teacher-request.component';
import { SchoolRegistrationComponent } from './components/school-registration/school-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    NavbarComponent,
    NotfoundComponent,
    AdminDashboardComponent,
    SuperAdminDashboardComponent,
    SchoolDetailsComponent,
    ApproveUserUpdateDetailsComponent,
    TeacherRegistrationComponent,
    DataentryDashboardComponent,
    TeacherRequestComponent,
    SchoolRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [LoginServiceService,AuthRouteGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
