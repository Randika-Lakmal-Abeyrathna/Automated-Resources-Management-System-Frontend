import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teacher-leave',
  templateUrl: './teacher-leave.component.html',
  styleUrls: ['./teacher-leave.component.css']
})
export class TeacherLeaveComponent implements OnInit {

  data: string ='';
  user = {
    userid:''
  }

  allTeacherRequest:Array<any> =[];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
    private toast:ToastrService) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadTeacherDetails(this.user.userid);
      }


    })

  }

  loadTeacherDetails(userid:string){
    this.teacherService.getTeacherData(userid)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          if (data.body.teacherType.type == 'principal'){
            this.getAllTeacherRequestForSchool(data.body.school.idschool);
          }

        },
        error=>{
          console.log(error);
        }
      );

  }

  getAllTeacherRequestForSchool(schoolid:number){
    this.teacherService.getTeacherRequestFroSchoolId(schoolid)
    .pipe(first())
    .subscribe(
      (data:any)=>{
        console.log("All Panding Data => ",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const p = data.body[i];
          console.log("data ==> ",p);
          this.allTeacherRequest.push(p);
        }
        

      },
      error=>{
        console.log(error);
      }
    );
  }

}
