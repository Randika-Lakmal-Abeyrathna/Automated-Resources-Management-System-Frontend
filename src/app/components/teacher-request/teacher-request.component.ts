import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-request',
  templateUrl: './teacher-request.component.html',
  styleUrls: ['./teacher-request.component.css']
})
export class TeacherRequestComponent implements OnInit {

  request = {
    provinceId: '',
    schoolId: '',
    comment: '',
    teacherId: 0
  }

  user = {
    userid:''
  }

  teacherData ={
    id:0
  }

  schoolList: any = [];
  provinceList: any = [];

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private loginService: LoginServiceService, private toast: ToastrService,
              private teacherService: TeacherService, private route:Router) {

   }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value) {
        this.user.userid = value.userid;
        this.getTeacherByNic(this.user.userid);
        
      }

    })
  }

  getTeacherByNic(nic:string){
    this.teacherService.getTeacherData(nic)
    .pipe(first())
    .subscribe(
      (data: any) => {
        console.log("teacher data => ", data.body);
          this.teacherData.id = data.body.id;
          if (data.body.teacherType.type == 'teacher-provincial'){
            let province = data.body.school.zonal.district.province;
            console.log("province => ",province);
            
            this.provinceList.push(province);
            this.getSchoolsByProvince(province.id);
          }else{
            this.getAllSchools();
            this.getAllProvinces();
          }

      },
      error => {
        console.log(error);
      }
    );
  }

  getSchoolsByProvince(provinceId:number){
    this.commonService.getSchoolsByProvince(provinceId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("province schools => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const s = data.body[i];
            const school = {
              id: s.idschool,
              name: s.name
            }
            this.schoolList.push(school);
          }

        },
        error => {
          console.log(error);
        }
      );
  }


  // Submit teacher Form
  submitRequest(data: any) {
    console.log("request data ", data);
    // Set flag to true
    let is_valid = true;

    if (data.provinceId == null || data.provinceId == '') {
      is_valid = false;
      this.toast.error("Province cannot be empty", "Error", { timeOut: 3000 })
    }
    if (data.schoolId == null || data.schoolId == '') {
      is_valid = false;
      this.toast.error("School name cannot be empty", "Error", { timeOut: 3000 })
    }
    data.teacherId = this.teacherData.id;

    if (is_valid) {
      console.log("in method");
      this.teacherService.requestTeacherRequest(data)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.toast.success("Sent The Request Successfully", "Success", { timeOut: 3000 });
            setTimeout(()=>{
              this.route.navigateByUrl('/dashboard');
            }, 2000);
            
          },
          error => {
            console.log(error);
            this.toast.error(error.error.message, "Error", { timeOut: 3000 });
          }
        );

    }
    
  }

  getAllSchools() {
    this.commonService.getAllSchools()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all schools => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const s = data.body[i];
            const school = {
              id: s.idschool,
              name: s.name
            }
            this.schoolList.push(school);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  getAllProvinces() {
    this.commonService.getAllProvinces()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all provinces => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const p = data.body[i];
            const province = {
              id: p.id,
              name: p.name
            }
            this.provinceList.push(province);
          }

        },
        error => {
          console.log(error);

        }
      );
  }

}
