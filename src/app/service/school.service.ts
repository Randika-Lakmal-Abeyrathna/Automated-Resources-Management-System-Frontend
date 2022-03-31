import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {


  private _addSchoolUrl = environment.baseUrl+"/api/school/add";
  private _addCarderDetailsUrl = environment.baseUrl+"/api/carder/add";

  constructor(private http:HttpClient, private router: Router) { }

  addSchool(data:any){
    return this.http.post<any>(this._addSchoolUrl,data,{observe:'response' as 'body'});
  }

  addCarderDetails(data:any){
    return this.http.post<any>(this._addCarderDetailsUrl,data,{observe:'response' as 'body'});
  }


}
