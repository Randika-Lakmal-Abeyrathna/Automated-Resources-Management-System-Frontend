import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path:"register",component:UserRegistrationComponent },
  {path:"",component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
