import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-all-schools',
  templateUrl: './all-schools.component.html',
  styleUrls: ['./all-schools.component.css']
})
export class AllSchoolsComponent implements OnInit {


  data: string ='';
  lockedData:string='';
  user = {
    userid:''
  }

  allSchoolDataArray:Array<any>=[];
  constructor(private loginService:LoginServiceService,private userService:UserService,private commonService:CommonService,
    private toast:ToastrService) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
      }


    });

    this.getAllSchools();

  }

  getAllSchools(){
    this.commonService.getAllSchools()
      .subscribe(
        (data:any)=>{
          for (let i = 0; i < data.body.length; i++) {
            const alldata = data.body[i];
            let school = {
              schoolid:alldata['idschool'],
              name:alldata['name'],
              schoolType:alldata['schoolType']['type'],
              zonal:alldata['zonal']['name'],
              city:alldata['city']['name']
            }

            this.allSchoolDataArray.push(school);

          }

        },
        error=>{
          console.log(error);
        }
      );
  }


}
