import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _getGenderUrl = environment.baseUrl+"/api/admin/gender/all";
  private _getCityUrl = environment.baseUrl+"/api/city/all";
  private _getSalutationUrl = environment.baseUrl+"/api/salutation/all";
  private _getMaritalStatusUrl = environment.baseUrl+"/api/maritalstatus/all";
  private _getAllSchoolUrl = environment.baseUrl+"/api/school/all";

  constructor(private http:HttpClient, private router: Router) { }


  getGender(){
    return this.http.get(this._getGenderUrl,{observe:'response' as 'body'});
  }

  getAllCity(){
    return this.http.get(this._getCityUrl,{observe:'response' as 'body'});
  }

  getAllSalutation(){
    return this.http.get(this._getSalutationUrl,{observe:'response' as 'body'});
  }

  getAllMaritalStatus(){
    return this.http.get(this._getMaritalStatusUrl,{observe:'response' as 'body'});
  }

  getAllSchools(){
    return this.http.get(this._getAllSchoolUrl,{observe:'response' as 'body'});
  }
}
