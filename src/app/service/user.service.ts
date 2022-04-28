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
  private _addUserUrl = environment.baseUrl+"/api/user/register";
  private _requestUpdateUserUrl = environment.baseUrl+"/api/updateuser/request";
  private _getUserUpdateRequestByUserUrl = environment.baseUrl+"/api/updateuser/find/user/";
  private _deleteUpdateUserRequestUrl =environment.baseUrl+"/api/updateuser/";
  private _getAllLockedUsersUrl =environment.baseUrl+"/api/user/lock/all";
  private _unlockUserUrl =environment.baseUrl+"/api/user/unlock/";
  private _changePassword = environment.baseUrl+"/api/user/reset"

  constructor(private http:HttpClient, private router: Router,private toast:ToastrService) { }

  getUserData(nic:string){
    return this.http.get(this._getUserDataUrl+nic,{observe:'response' as 'body'});
  }

  registerUser(data:any){
    return this.http.post<any>(this._addUserUrl,data,{observe:'response' as 'body'});
  }

  requestUpdateUser(data:any){
    return this.http.put<any>(this._requestUpdateUserUrl,data,{observe:'response' as 'body'});
  }

  getUserUpdateRequestByUser(nic:string){
    return this.http.get(this._getUserUpdateRequestByUserUrl+nic,{observe:'response' as 'body'});
  }

  deleteUserUpdateRequest(id:number){
    return this.http.delete(this._deleteUpdateUserRequestUrl+id,{observe:'response' as 'body'});
  }

  getAllLockedUsers(){
    return this.http.get(this._getAllLockedUsersUrl,{observe:'response' as 'body'});
  }

  unlockUser(nic:string){
    return this.http.get(this._unlockUserUrl+nic,{observe:'response' as 'body'});
  }

  changePassword(data:any){
    return this.http.post<any>(this._changePassword,data,{observe:'response' as 'body'});
  }

}
