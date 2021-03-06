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

  updateRequestData = {
    id:'',
    provunce:'',
    school:'',
    comment:''
  }

  teacherSubjects:Array<string> =[];

  teacherExperienceDataArray:Array<any> =[];

  allTeacherSubjectArray:Array<any> =[];
  allTeacherDataArray:Array<any>=[];
  schoolCarderDataArray:Array<any>=[];
  allRequestsArray:Array<any> =[];

  personalDetails =true;
  teacherDetails =false;

  genderDropDownList:any =[];
  salutationDropDownList:any=[];
  cityDropDownList:any=[];
  maritalStatusDropDownList:any=[];

  updateRequestList:any =[];

  schoolList: any = [];
  provinceList: any = [];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
              private formBuilder: FormBuilder,private commonService:CommonService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadUserData(this.user.userid);
        this.loadTeacherDetails(this.user.userid);
        this.getUpdateRequestForUser(this.user.userid);
        this.requestsByNic(this.user.userid);
        this.getAllSchools();
        this.getAllProvinces();
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

  getUpdateRequestForUser(userid:string){
    this.userService.getUserUpdateRequestByUser(userid)
      .pipe(first())
      .subscribe(
        (data:any)=>{
    console.log("All User requests",data.body);
          for (let i = 0; i < data.body.length; i++) {
            const request = data.body[i];

            let statusId = request.status;
            let status = '';

            if (statusId == 0){
              status="Pending";
            }else if(statusId ==1){
              status ="Approved";
            }else {
              status="Rejected";
            }


            let updateRequest ={
              id:request.id,
              status:status,
              comment:request.comment
            }

            this.updateRequestList.push(updateRequest);
          }

        },
        error=>{
          console.log(error);
        }
      );
  }

  deleteUserUpdateRequest(id:number){
    this.userService.deleteUserUpdateRequest(id)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.toast.success("Request Deleted","Success",{timeOut: 3000});
          setTimeout(()=>{
            return window.location.reload();
          }, 1000);
        },
        error=>{
          console.log(error);
        }
      );
  }


  requestsByNic(nic:string){
    this.teacherService.getAllRequestForUser(nic)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("requests => ",data.body);

          for (let i = 0; i < data.body.length; i++) {
            const r = data.body[i];

            let statusId = r.status;
            let status = '';
            let flag=false;

            if (statusId == 0){
              status="Pending";
              flag=true;
            }else if(statusId ==1){
              status ="Approved";
            }else {
              status="Rejected";
            }

            const request = {
              id:r.idrequest,
              status:status,
              province:r.province.name,
              school:r.school.name,
              comment:r.comment,
              flag :flag
            }
  
            this.allRequestsArray.push(request);
          }
        },
        error=>{
          console.log(error);
        }
      );
  }

  updateRequest(data:any,id:number){
    console.log("data =>",data);
    console.log("id ==>", id);

    let schoolId = 0;
    let provinceId= 0;

    if(!isNaN(Number(data.schoolId))){
      schoolId = data.schoolId;
    }

    if(!isNaN(Number(data.provinceId))){
      provinceId = data.provinceId;
    }

    let requestData = {
      id:id,
      schoolId:schoolId,
      provinceId:provinceId,
      comment:data.comment
    }

    this.teacherService.updateRequest(requestData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toast.success("Transfer Request Updated","Success",{timeOut: 3000});
          setTimeout(()=>{
            return window.location.reload();
          }, 1000);
         

        },
        error => {
          console.log(error);
        }
      );
    
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
