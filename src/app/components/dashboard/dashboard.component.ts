import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {first} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {TeacherService} from "../../service/teacher.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {CommonService} from "../../service/common.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;

  user = {
    userid:''
  }
  updateUserForm!: FormGroup;

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

  teacherExperienceDataArray:Array<any> =[];

  allTeacherSubjectArray:Array<any> =[];
  allTeacherDataArray:Array<any>=[];
  schoolCarderDataArray:Array<any>=[];

  personalDetails =true;
  teacherDetails =false;

  genderDropDownList:any =[];
  salutationDropDownList:any=[];
  cityDropDownList:any=[];
  maritalStatusDropDownList:any=[];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
              private formBuilder: FormBuilder,private commonService:CommonService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadUserData(this.user.userid);
        this.loadTeacherDetails(this.user.userid);
      }


    })

    this.updateUserForm = this.formBuilder.group({

    });

// Gender DropDown start
    this.commonService.getGender().subscribe(
      (data:any )=> {
        console.log("gender",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const g = data.body[i];
          const gender = {
            id:g.idgender,
            name:g.gender
          }
          this.genderDropDownList.push(gender);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // Gender DropDown end

    // City DropDown start
    this.commonService.getAllCity().subscribe(
      (data:any )=> {
        console.log("city",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const c = data.body[i];
          const city = {
            id:c.idcity,
            city:c.name
          }
          this.cityDropDownList.push(city);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // City DropDown end

    // Salutation DropDown start
    this.commonService.getAllSalutation().subscribe(
      (data:any )=> {
        console.log("Salutation",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const s = data.body[i];
          const salutation = {
            id:s.idsalutation,
            salutation:s.salutation
          }
          this.salutationDropDownList.push(salutation);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // Salutation DropDown end

    // MaritalStatus DropDown start
    this.commonService.getAllMaritalStatus().subscribe(
      (data:any )=> {
        console.log("MaritalStatus",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const m = data.body[i];
          const maritalStatus = {
            id:m.id,
            status:m.status
          }

          this.maritalStatusDropDownList.push(maritalStatus);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // MaritalStatus DropDown end

  }

  loadUserData(userid:string){
    this.userService.getUserData(userid)
      .pipe(first())
      .subscribe(
        (data:any )=> {
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
          this.teacherData.appointmentDate=data.body.appointmentdate;
            this.teacherData.schoolName=data.body.school.name;
            this.teacherData.schoolType=data.body.school.schoolType.type;
            this.teacherData.zonalName=data.body.school.zonal.name;
            this.teacherData.teacherType=data.body.teacherType.type;
          for (let i = 0; i < data.body.subjects.length; i++) {
            const sub = data.body.subjects[i]['name']+'  -  '+data.body.subjects[i]['description']
            this.teacherSubjects.push(sub);
          }
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

          for (let i = 0; i < data.body.length; i++) {
            const exdata = data.body[i];
            let teacherExperienceData ={
              appointmentDate:exdata['appointntdate'],
              appointmentEndDate:exdata['appointmentenddate'],
              schoolName:exdata['school']['name'],
              schoolType:exdata['school']['schoolType']['type'],
              zonalName:exdata['school']['zonal']['name']
            }

            this.teacherExperienceDataArray.push(teacherExperienceData);
          }

        },
        error=>{
            console.log(error);
        }
      );
  }



  updateUserRequest(data:any){
    data.userid = this.user.userid;

    let is_valid = true;

    if (data.salutation == null || data.salutation ==''){
      is_valid= false;
      this.toast.error("Salutation cannot be empty","Error",{timeOut: 3000})
    }
    if (data.gender == null || data.gender ==''){
      is_valid= false;
      this.toast.error("Gender cannot be empty","Error",{timeOut: 3000})
    }
    if (data.maritalstatus == null || data.maritalstatus ==''){
      is_valid= false;
      this.toast.error("Marital Status cannot be empty","Error",{timeOut: 3000})
    }
    if (data.city == null || data.city ==''){
      is_valid= false;
      this.toast.error("City cannot be empty","Error",{timeOut: 3000})
    }

    if (is_valid){
      this.userService.requestUpdateUser(data)
        .pipe(first())
        .subscribe(
          (data:any)=>{
            this.toast.success("Update Request Created","Success",{timeOut: 3000})
            this.closebutton.nativeElement.click();

          },
          error=>{
            console.log(error);
          }
        );

    }
  }

}
