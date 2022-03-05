import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {path:"register",component:UserRegistrationComponent },
  {path:"",component:LoginComponent },
  {path:"forgot",component:ForgotPasswordComponent},
  {path:"dashboard",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
