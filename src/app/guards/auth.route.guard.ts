import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LoginServiceService} from "../service/login-service.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthRouteGuard implements CanActivate{


  constructor(private loginService:LoginServiceService,private route:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userData = this.loginService.userInfo.getValue();

    console.log("userData" , userData);
    if (userData && userData.userid){
      console.log("url",state.url);
        if (state.url.indexOf("/dashboard") > -1){
          return true;
        }
        if (state.url.indexOf("/register") > -1){
          return true;
        }

        if (state.url.indexOf("/admin") > -1){
          return true;
        }
        if(state.url.indexOf("/superadmin") > -1){
          return true;
        }
        if (state.url.indexOf("/schooldetail") > -1){
          return true;
        }

      if (state.url.indexOf("/teacherupdate") > -1){
        return true;
      }

        if (state.url.indexOf("/login") >-1){
          this.route.navigateByUrl('/dashboard');
          return false;
        }

        if (state.url.indexOf("/forgot") > -1){
          this.route.navigateByUrl("/dashboard");
          return false;
        }

    }else{
      if(state.url.indexOf("dashboard") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("register") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("admin") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("superadmin") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("schooldetail") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("teacherupdate") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("/login") > -1){
        return true;
      }
      if (state.url.indexOf("/forgot") > -1){
        return true;
      }
    }

    return false;

  }

}
