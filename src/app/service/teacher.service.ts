import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private _getTeacherDataUrl=environment.baseUrl+"/api/teacher/find/";
  private _getTeacherExperienceUrl=environment.baseUrl+"/api/teacher/experience/";
  private _getAllTeachersFromSchoolIdUrl = environment.baseUrl+"/api/teacher/experience/";
  private _getCarderDetailsBySchoolIdUrl = environment.baseUrl+"/api/school/carder/";

  constructor(private http:HttpClient,private router: Router,private toast:ToastrService) { }

  getTeacherData(nic:string){
    return this.http.get(this._getTeacherDataUrl+nic,{observe:'response' as 'body'});
  }

  getTeacherExperience(id:number){
    return this.http.get(this._getTeacherExperienceUrl+id,{observe:'response' as 'body'});
  }

  getAllTeachersFromSchool(schoolid:number){
    return this.http.get(this._getAllTeachersFromSchoolIdUrl+schoolid,{observe:'response' as 'body'});
  }

  getCarderDetailsBySchool(schoolid:number){
    return this.http.get(this._getCarderDetailsBySchoolIdUrl+schoolid,{observe:'response' as 'body'});
  }

}
