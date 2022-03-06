import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthRouteGuard} from "./guards/auth.route.guard";
import {NotfoundComponent} from "./components/notfound/notfound.component";

const routes: Routes = [
  {path:"register",component:UserRegistrationComponent,
    canActivate:[AuthRouteGuard]
  },
  {path:"login",component:LoginComponent,
    canActivate:[AuthRouteGuard]
  },
  {path:"forgot",component:ForgotPasswordComponent,
    canActivate:[AuthRouteGuard]
  },
  {path:"dashboard",component:DashboardComponent,
    canActivate:[AuthRouteGuard]
  },
  {path:"",redirectTo:'/login',pathMatch:'full'},
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
