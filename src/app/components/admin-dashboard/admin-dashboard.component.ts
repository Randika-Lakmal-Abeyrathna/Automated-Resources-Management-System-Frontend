import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data: string ='';
  user = {
    userid:''
  }

  userDetails ={
    firstName:''
  }

  allTeacherRequestDataArray:Array<any>=[];
  provinceArray:Array<any> = [];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
    private toast:ToastrService,private adminService:AdminService) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.getAdminProvice(this.user.userid);
        
      }


    });
  }

  getAllTeacherRequestDataByAdminProvince(){
    for (let i = 0; i < this.provinceArray.length; i++) {
        let province = this.provinceArray[i];
        console.log("province Data => ", province );
        
        this.adminService.getRequestByAdminProvince(province.id)
          .subscribe(
            (data:any)=>{

              console.log("Request Data" , data);

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

  getAdminProvice(nic:string){
    this.adminService.getAdminProvince(nic)
      .subscribe(
        (data:any)=>{

          console.log("Admin Provice Data :" , data);

          for (let i = 0; i < data.body.length; i++) {
            const p = data.body[i];
            this.userDetails.firstName= p['user']['firstName']
            let province = {
              id:p['province']['id'],
              name:p['province']['name']
            }

            this.provinceArray.push(province);

          }
          this.getAllTeacherRequestDataByAdminProvince();
        },
        error=>{
          console.log(error);
        }
      );
  }

}
