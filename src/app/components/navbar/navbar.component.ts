import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {UserService} from "../../service/user.service";
import {TeacherService} from "../../service/teacher.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = {
    userid:''
  }

  userData = {
    userType:''
  }

  teacherData = {
    teacherType:''
  }


  userLogedIn = false;
  userLogOut = true;
  constructor(private loginService:LoginServiceService, private router:Router, private userService:UserService, private teacherService:TeacherService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.userLogedIn =true;
        this.userLogOut = false;
        this.user.userid = value.userid;
        this.getUserType(this.user.userid);
      }else{
        this.userLogedIn= false;
        this.userLogOut=true;
      }
    })
  }


  logout(){
    this.userLogedIn=false;
    this.userLogOut=true;
   this.loginService.logout();

  }

  getUserType(userid:string){
    this.userService.getUserData(userid)
      .pipe(first())
      .subscribe(
        (data:any )=> {
          this.userData.userType = data.body.userType.userType;

          if (this.userData.userType == 'user'){
            this.getTeacherType(userid);
          }
        },
        error => {
          if (error.status == 403){

          }

        }
      );
  }

  getTeacherType(userid:string){
    this.teacherService.getTeacherData(userid)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.teacherData.teacherType = data.body.teacherType.type;
        },
        error=>{
          console.log(error);
        }
      );
  }


}
