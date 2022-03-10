import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {first} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {TeacherService} from "../../service/teacher.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = {
    userid:''
  }

  userDetails = {
    firstName:'',
    middleName:'',
    lastName:'',
    addressNo:'',
    addressStreet1:'',
    addressStreet2:'',
    city:'',
    nic:'',
    contactNumber1:'',
    contactNumber2:'',
    email:'',
    gender:'',
    salutation:'',
    maritalStatus:''
  }

  teacherData={
    appointmentDate:'',
    schoolName:'',
    schoolType:'',
    zonalName:'',
    teacherType:'',


  }
  teacherSubjects:Array<string> =[];

  teacherExperienceData ={
    appointmentDate:'',
    appointmentEndDate:'',
    schoolName:'',
    schoolType:'',
    zonalName:''
  }

  teacherExperienceDataArray:Array<any> =[];

  personalDetails =true;
  teacherDetails =false;

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadUserData(this.user.userid);
        this.loadTeacherDetails(this.user.userid);
      }


    })

  }

  loadUserData(userid:string){
    this.userService.getUserData(userid)
      .pipe(first())
      .subscribe(
        (data:any )=> {
          console.log(data.body);
            this.userDetails.firstName=data.body.firstName;
            this.userDetails.middleName=data.body.middleName;
            this.userDetails.lastName=data.body.lastName;
            this.userDetails.addressNo=data.body.addressNo;
            this.userDetails.addressStreet1=data.body.addressStreet;
            this.userDetails.addressStreet2=data.body.addressStreet2;
            this.userDetails.city=data.body.city.name;
            this.userDetails.nic=data.body.nic;
            this.userDetails.contactNumber1=data.body.contactNumber1;
            this.userDetails.contactNumber2=data.body.contactNumber2;
            this.userDetails.email=data.body.email;
            this.userDetails.gender=data.body.gender.gender;
            this.userDetails.salutation=data.body.salutation.salutation;
          this.userDetails.maritalStatus=data.body.maritalStatus.status;
        },
        error => {
          if (error.status == 403){

          }

        }
      );
  }

  checkVisited(data:any){
    console.log(data);
    if(data == 'personaldetails'){
      this.personalDetails = true;
      this.teacherDetails =false;
    }else if(data == 'teacherdetails'){
      this.personalDetails = false;
      this.teacherDetails =true;
    }
  }

  teacherid:number =0;

  loadTeacherDetails(userid:string){
    this.teacherService.getTeacherData(userid)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("Teacher Data",data.body);
          this.teacherData.appointmentDate=data.body.appointmentdate;
            this.teacherData.schoolName=data.body.school.name;
            this.teacherData.schoolType=data.body.school.schoolType.type;
            this.teacherData.zonalName=data.body.school.zonal.name;
            this.teacherData.teacherType=data.body.teacherType.type;
          for (let i = 0; i < data.body.subjects.length; i++) {
            const sub = data.body.subjects[i]['name']+'  -  '+data.body.subjects[i]['description']
            this.teacherSubjects.push(sub);
          }
          console.log("subject array",this.teacherSubjects);
          console.log("teacherData",this.teacherData);
          this.teacherid =data.body.id;
          this.loadTeacherExperienceDetails(this.teacherid);
        },
        error=>{
          console.log(error);
        }
      );

  }

  loadTeacherExperienceDetails(id:number){
    this.teacherService.getTeacherExperience(id)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("Teacher Experiance",data.body);

          for (let i = 0; i < data.body.length; i++) {
            const exdata = data.body[i];
            const experiance = this.teacherExperienceData;
            experiance.appointmentEndDate=exdata['appointmentenddate'];
            experiance.appointmentDate=exdata['appointntdate'];
            experiance.schoolName=exdata['school']['name'];
            experiance.schoolType=exdata['school']['schoolType']['type'];
            experiance.zonalName =exdata['school']['zonal']['name'];

            this.teacherExperienceDataArray.push(experiance);
          }

          console.log("experiance data array", this.teacherExperienceDataArray);

        },
        error=>{

        }
      );
  }
}
