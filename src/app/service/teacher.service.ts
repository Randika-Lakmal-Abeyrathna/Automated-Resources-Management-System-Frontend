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
  private _getAllTeachersFromSchoolIdUrl = environment.baseUrl+"/api/teacher/school/";
  private _getCarderDetailsBySchoolIdUrl = environment.baseUrl+"/api/school/carder/";
  private _getPendingUserUpdateForPrincipalUrl = environment.baseUrl+"/api/updateuser/find/";
  private _getUpdateUserByIdUrl = environment.baseUrl+"/api/updateuser/";
  private _approveUserUpdateDetailsUrl = environment.baseUrl+"/api/updateuser/update/";
  private _rejectUserUpdateDetailsUrl = environment.baseUrl+"/api/updateuser/update/"

  constructor(private http:HttpClient,private router: Router,private toast:ToastrService) { }

  getTeacherData(nic:string){
    return this.http.get(this._getTeacherDataUrl+nic,{observe:'response' as 'body'});
  }

  getTeacherExperience(id:number){
    return this.http.get(this._getTeacherExperienceUrl+id,{observe:'response' as 'body'});
  }

  getAllTeachersFromSchool(id:number){
    return this.http.get(this._getAllTeachersFromSchoolIdUrl+id,{observe:'response' as 'body'});
  }

  getCarderDetailsBySchool(schoolid:number){
    return this.http.get(this._getCarderDetailsBySchoolIdUrl+schoolid,{observe:'response' as 'body'});
  }

  getPendingUserUpdateForPrincipal(userid:string){
    return this.http.get(this._getPendingUserUpdateForPrincipalUrl+userid,{observe:'response' as 'body'});
  }

  getUpdateUserDetailById(id:number){
    return this.http.get(this._getUpdateUserByIdUrl+id,{observe:'response' as 'body'});
  }

  approveUserDetails(id:number){
    return this.http.get(this._approveUserUpdateDetailsUrl+id,{observe:'response' as 'body'});
  }

  rejectUserDetails(data:any){
    return this.http.put<any>(this._rejectUserUpdateDetailsUrl,data,{observe:'response' as 'body'});
  }



}
