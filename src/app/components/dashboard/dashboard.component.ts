import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {first} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

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

  personalDetails =true;
  contactDetails =false;
  teacherDetails =false;
  subjectDetails =false;

  constructor(private loginService:LoginServiceService,private userService:UserService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadUserData(this.user.userid);
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
      this.contactDetails=false;
      this.teacherDetails =false;
      this.subjectDetails=false;
    }else if(data == 'contactdetails'){
      this.personalDetails = false;
      this.contactDetails=true;
      this.teacherDetails =false;
      this.subjectDetails=false;
    }else if(data == 'teacherdetails'){
      this.personalDetails = false;
      this.contactDetails=false;
      this.teacherDetails =true;
      this.subjectDetails=false;
    }else if(data == 'subjectdetails'){
      this.personalDetails = false;
      this.contactDetails=false;
      this.teacherDetails =false;
      this.subjectDetails=true;
    }
  }

}
