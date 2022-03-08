import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _getUserDataUrl="http://localhost:8301/api/user/find/";

  constructor(private http:HttpClient, private router: Router,private toast:ToastrService) { }

  getUserData(nic:string){
    return this.http.get(this._getUserDataUrl+nic,{observe:'response' as 'body'});
  }
}
