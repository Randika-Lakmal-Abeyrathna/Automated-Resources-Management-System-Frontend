import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {


  private _forgotPasswordUrl = 'http://localhost:8301/api/user/forgot';

  constructor(private http:HttpClient) { }

  forgotPassword(data:any){
    return this.http.post<any>(this._forgotPasswordUrl,data,{observe:'response' as 'body'});
  }
}
