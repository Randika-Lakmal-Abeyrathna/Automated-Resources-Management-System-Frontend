import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {TeacherService} from "../../service/teacher.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

  data: string ='';
  user = {
    userid:''
  }

  allTeacherSubjectArray:Array<any> =[];
  allTeacherDataArray:Array<any>=[];
  schoolCarderDataArray:Array<any>=[];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
              private formBuilder: FormBuilder) { }

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
            this.loadSchoolAllTeaches(data.body.school.idschool);
            this.loadCarderDetails(data.body.school.idschool);
          }

        },
        error=>{
          console.log(error);
        }
      );

  }

  loadSchoolAllTeaches(schoolId:number){
    this.teacherService.getAllTeachersFromSchool(schoolId)
      .subscribe(
        (data:any)=>{
          for (let i = 0; i < data.body.length; i++) {
            const alldata = data.body[i];
            let allTeacherData = {
              teacherid:alldata['id'],
              name:alldata['user']['firstName'] +' '+alldata['user']['lastName'],
              email:alldata['user']['email'],
              contactNumber:alldata['user']['contactNumber1'],
              appointmentDate:alldata['appointmentdate']
            }

            this.allTeacherDataArray.push(allTeacherData);

            for (let j = 0; j < alldata['subjects']['length']; j++) {
              const subject = alldata['subjects'][j];
              let allTeacherSubjectDetails ={
                teacherId:alldata['id'],
                subject:subject['name']+' - ' +subject['description'],
              }
              this.allTeacherSubjectArray.push(allTeacherSubjectDetails);
            }

          }

        },
        error=>{
          console.log(error);
        }
      );
  }

  loadCarderDetails(schoolId:number){
    this.teacherService.getCarderDetailsBySchool(schoolId)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          for (let i = 0; i < data.body.length; i++) {
            const carder = data.body[i];
            let carderData ={
              limitation:carder['limitation'],
              current:carder['current'],
              subject:carder['subjects']['name'] +' - '+ carder['subjects']['description']
            }

            this.schoolCarderDataArray.push(carderData);

          }

        },
        error=>{
          console.log(error);
        }
      );
  }


}
