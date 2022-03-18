import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _getUserDataUrl=environment.baseUrl+"/api/user/find/";
  private _requestUpdateUserUrl = environment.baseUrl+"/api/updateuser/request"

  constructor(private http:HttpClient, private router: Router,private toast:ToastrService) { }

  getUserData(nic:string){
    return this.http.get(this._getUserDataUrl+nic,{observe:'response' as 'body'});
  }

  requestUpdateUser(data:any){
    return this.http.put<any>(this._requestUpdateUserUrl,data,{observe:'response' as 'body'});
  }
}
