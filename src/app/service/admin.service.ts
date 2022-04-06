import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _getAdminProvinceUrl = environment.baseUrl+"/api/admin/province/";
  private _getAllRequestByAdminProvinceUrl = environment.baseUrl+"/api/request/all/";
  private _getRequestByIdUrl  =environment.baseUrl+"/api/request/find/";
  private _getsuggestionForRequestUrl = environment.baseUrl+"/api/request/suggest/";
  private _approveRequestUrl = environment.baseUrl+"/api/request/approve";
  private _getAllNonZonalRequestBySuperAdmin = environment.baseUrl+"/api/request/all/nonzonal";
  private _rejectRequestUrl = environment.baseUrl+"/api/request/reject";

  constructor(private http:HttpClient) { }

  getAdminProvince(nic:String){
    return this.http.get(this._getAdminProvinceUrl+nic,{observe:'response' as 'body'});
  }

  getRequestByAdminProvince(id:number){
    return this.http.get(this._getAllRequestByAdminProvinceUrl+id,{observe:'response' as 'body'});
  }

  getRequestById(id:number){
    return this.http.get(this._getRequestByIdUrl+id,{observe:'response' as 'body'});
  }

  getSuggestionForRequest(id:number){
    return this.http.get(this._getsuggestionForRequestUrl+id,{observe:'response' as 'body'});
  }

  approveRequest(data:any){
    return this.http.post<any>(this._approveRequestUrl,data,{observe:'response' as 'body'});
  }

  getRequestForSuperAdmin(){
    return this.http.get(this._getAllNonZonalRequestBySuperAdmin,{observe:'response' as 'body'});
  }

  rejectRequest(data:any){
    return this.http.put<any>(this._rejectRequestUrl,data,{observe:'response' as 'body'});
  }


}
