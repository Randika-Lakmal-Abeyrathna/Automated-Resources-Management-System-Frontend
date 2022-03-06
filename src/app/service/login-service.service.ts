import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _loginUrl = 'http://localhost:8301/login';

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
            userid : decryptedAccessToken.sub
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
      userid : decryptedAccessToken.sub
    };

    this.userInfo.next(userdata);

    // return this.router.navigateByUrl("dashboard");

  }
}
