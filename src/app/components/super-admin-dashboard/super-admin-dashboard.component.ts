import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/service/admin.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {


  data: string ='';
  user = {
    userid:''
  }

  userDetails ={
    firstName:''
  }

  allTeacherRequestDataArray:Array<any>=[];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
    private toast:ToastrService,private adminService:AdminService) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.getUserDetails(this.user.userid);
        this.getAllTeacherRequestData();
        
      }


    });

  }

  getUserDetails(nic:string){
    this.userService.getUserData(nic)
    .pipe(first())
    .subscribe(
      (data:any)=>{
        this.userDetails.firstName = data.body.firstName;
        
      },
      error=>{
        console.log(error);
      }
    );
  }

  getAllTeacherRequestData(){
    
      this.adminService.getRequestForSuperAdmin()
          .subscribe(
            (data:any)=>{
              for (let i = 0; i < data.body.length; i++) {
                const r = data.body[i];
                let request = {
                  id:r['idrequest'],
                  nic:r['teacher']['user']['nic'],
                  name:r['teacher']['user']['firstName'] +' - ' + r['teacher']['user']['lastName'],
                  email:r['teacher']['user']['email'],
                  contactNumber:r['teacher']['user']['contactNumber1'],
                  teacherType:r['teacher']['teacherType']['type'],
                  province:r['province']["name"]
                }

                this.allTeacherRequestDataArray.push(request);

              }

            },
            error=>{
              console.log(error);
            }
          );

    
    
  }

}
