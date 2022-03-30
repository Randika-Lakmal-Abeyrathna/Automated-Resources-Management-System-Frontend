import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teacher-onboard',
  templateUrl: './teacher-onboard.component.html',
  styleUrls: ['./teacher-onboard.component.css']
})
export class TeacherOnboardComponent implements OnInit {


  data: string ='';
  user = {
    userid:''
  }

  allPendingOnBoadRequestForSchool:Array<any> =[];

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
            this.getAllPendingOnBoardRequest(data.body.school.idschool);
          }

        },
        error=>{
          console.log(error);
        }
      );

  }

  getAllPendingOnBoardRequest(schoolid:number){
    this.teacherService.getAllPendingOnBoardRequest(schoolid)
    .pipe(first())
    .subscribe(
      (data:any)=>{
        console.log("All Panding Data => ",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const p = data.body[i];
          let pending = {
            id:p.id,
            nic:p.request.teacher.user.nic,
            name:p.request.teacher.user.firstName +' '+ p.request.teacher.user.lastName,
            contactNumber:p.request.teacher.user.contactNumber1,
            appointmentDate:p.appointmentDate,
            subject:p.carder.subjects.name
          }

          this.allPendingOnBoadRequestForSchool.push(pending);

        }
        console.log(this.allPendingOnBoadRequestForSchool);

      },
      error=>{
        console.log(error);
      }
    );
  }

  onBoardTeacher(id:number){
    
    this.teacherService.approveOnBoardRequest(id)
    .pipe(first())
    .subscribe(
      (data:any)=>{
        this.toast.success("Teacher Successfuly On Boarded","Success",{timeOut: 3000});
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
