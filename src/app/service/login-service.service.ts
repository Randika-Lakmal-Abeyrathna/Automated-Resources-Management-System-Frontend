import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _loginUrl = environment.baseUrl+'/login';
  private _lockUserUrl = environment.baseUrl+'/api/user/lock/';
  private _isUserUnlockUrl = environment.baseUrl+'/api/user/isLock/';

  userInfo:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  jwtHelper = new JwtHelperService();
  constructor(private http:HttpClient, private router: Router,private toast:ToastrService) {
    this.loadUserInfo();

  }

  loadUserInfo(){
    const userDetail = this.userInfo.getValue();
    console.log("user details",userDetail);
    if (!userDetail){

      const accesstoken=localStorage.getItem('access_token');

      if (accesstoken){
        try {
          const decryptedAccessToken = this.jwtHelper.decodeToken(accesstoken);
          const userdata = {
            access_token : accesstoken,
            userid : decryptedAccessToken.sub,
            user_role:decryptedAccessToken.authorities[0].authority
          };

          this.userInfo.next(userdata);
        }catch(error){
          localStorage.removeItem('access_token');
          this.toast.error("Invalid Token","Error",{timeOut: 3000});
        }


      }
    }
  }


  login(data:any){
    return this.http.post<any>(this._loginUrl,data,{observe:'response' as 'body'});
  }

  checkAccesstoken(tokan:any){
    const accesstoken = tokan.split(" ",2)[1];

    const decryptedAccessToken = this.jwtHelper.decodeToken(accesstoken);

    console.log("decrypt", decryptedAccessToken);
    console.log(decryptedAccessToken.authorities[0].authority)

    localStorage.setItem('access_token',accesstoken);

    const userdata = {
      access_token : accesstoken,
      userid : decryptedAccessToken.sub,
      user_role:decryptedAccessToken.authorities[0].authority
    };

    this.userInfo.next(userdata);

    const user_role = decryptedAccessToken.authorities[0].authority;
  console.log("user_role",user_role);
    if (user_role == 'ROLE_ADMIN'){
      return this.router.navigateByUrl("admin");
    }else if(user_role == 'ROLE_SUPERADMIN'){
      return this.router.navigateByUrl("superadmin");
    }else if(user_role == 'ROLE_DATAENTRY'){
      return this.router.navigateByUrl("dataentry");
    }else{
      return this.router.navigateByUrl("dashboard");
    }


  }

  logout(){
    // setTimeout(() => {
      localStorage.removeItem('access_token');
      this.userInfo =new BehaviorSubject<any>(null);
    // }, 2000);
    return this.router.navigateByUrl("login");

  }

  lockUser(nic:string){
    return this.http.get(this._lockUserUrl+nic,{observe:'response' as 'body'});
  }

  isUserUnlock(nic:string){
    return this.http.get(this._isUserUnlockUrl+nic,{observe:'response' as 'body'});
  }

}
