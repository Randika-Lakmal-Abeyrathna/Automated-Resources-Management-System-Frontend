import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _getAdminProvinceUrl = environment.baseUrl+"/api/admin/province/";
  private _getAllRequestByAdminProvinceUrl = environment.baseUrl+"/api/request/all/"
  constructor(private http:HttpClient) { }

  getAdminProvince(nic:String){
    return this.http.get(this._getAdminProvinceUrl+nic,{observe:'response' as 'body'});
  }

  getRequestByAdminProvince(id:number){
    return this.http.get(this._getAllRequestByAdminProvinceUrl+id,{observe:'response' as 'body'});
  }


}
