import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {TeacherService} from "../../service/teacher.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dataentry-dashboard',
  templateUrl: './dataentry-dashboard.component.html',
  styleUrls: ['./dataentry-dashboard.component.css']
})
export class DataentryDashboardComponent implements OnInit {


  data: string ='';
  lockedData:string='';
  user = {
    userid:''
  }

  allTeacherDataArray:Array<any>=[];
  allLockedUsers:Array<any> = [];
  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
    private toast:ToastrService) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
      }


    });

    this.getAllTeachers();
    this.getAllLockedUsers();



  }

  getAllTeachers(){
    this.teacherService.getAllTeachers()
      .subscribe(
        (data:any)=>{

          console.log("all Teacher Data :" , data);

          for (let i = 0; i < data.body.length; i++) {
            const alldata = data.body[i];
            let allTeacherData = {
              teacherid:alldata['id'],
              name:alldata['user']['firstName'] +' '+alldata['user']['lastName'],
              email:alldata['user']['email'],
              contactNumber:alldata['user']['contactNumber1'],
              appointmentDate:alldata['appointmentdate'],
              nic:alldata['user']['nic'],
              teacherType:alldata['teacherType']['type']
            }

            this.allTeacherDataArray.push(allTeacherData);

          }

        },
        error=>{
          console.log(error);
        }
      );
  }

  getAllLockedUsers(){
    this.userService.getAllLockedUsers()
      .subscribe(
        (data:any)=>{

          console.log("all Locked :" , data);

          for (let i = 0; i < data.body.length; i++) {
            const alldata = data.body[i];
            let lockedUsers = {
              nic:alldata['nic']
            }
          
            this.allLockedUsers.push(lockedUsers);
          
          }

        },
        error=>{
          console.log(error);
        }
      );
  }

  unlockUser(nic:string){
    this.userService.unlockUser(nic)
      .subscribe(
        (data:any)=>{

          this.toast.success("User Unlocked","Success",{timeOut: 3000});
          setTimeout(()=>{
            return window.location.reload();
          }, 1000);
          
        },
        error=>{
          console.log(error);
        }
      );
    
  }

}
