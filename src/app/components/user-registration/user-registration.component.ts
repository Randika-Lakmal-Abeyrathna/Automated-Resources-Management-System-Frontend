import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { UserService } from 'src/app/service/user.service';
// import axios, { Axios } from 'axios';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  // Flag to check if form submitted by user to handle error messages
  isFormSubmitted = false;

  uRegister = {
      cityId: '',
      userTypeId: '',
      status: ''

  }

  userDetails = {
    salutationId:0,
    firstName:'',
    middleName:'',
    lastName:'',
    addressNo:'',
    addressStreet1:'',
    addressStreet2:'',
    cityId:'',
    contactNumber1:'',
    contactNumber2:'',
    nic:'',
    email:'',
    userTypeId:'',
    statusId:'',
    genderId:'',
    maritalStatusId:''
  }

  cityList: any = [];
  userTypeList: any = [];
  statusList: any = [];


  constructor(
    private formBuilder: FormBuilder,private route: Router, private commonService: CommonService,private loginService: LoginServiceService,
    private toast:ToastrService,private userService:UserService

  ) { }

  PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value) {
        this.getAllCities();
        this.getAllUserType();
        this.getAllStatus();
      }

    })
  }

  // Submit User Form
  submitUser(data:any) {

    console.log(data);
    
    let is_valid = true;

    // validation

    if (data.salutationId == null || data.salutationId =='0' || data.salutationId ==''){
      is_valid= false;
      this.toast.error("Salutation cannot be empty","Error",{timeOut: 3000})
    }

    if (data.firstName == null  || data.firstName ==''){
      is_valid= false;
      this.toast.error("First Name cannot be empty","Error",{timeOut: 3000})
    }

    if (data.lastName == null  || data.lastName ==''){
      is_valid= false;
      this.toast.error("Last Name cannot be empty","Error",{timeOut: 3000})
    }

    if (data.cityId == null  || data.cityId ==''){
      is_valid= false;
      this.toast.error("City cannot be empty","Error",{timeOut: 3000})
    }

    if (data.nic == null  || data.nic ==''){
      is_valid= false;
      this.toast.error("NIC cannot be empty","Error",{timeOut: 3000})
    }

    if (data.email == null  || data.email ==''){
      is_valid= false;
      this.toast.error("Email cannot be empty","Error",{timeOut: 3000})
    }

    let text = data.email;
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/
    let result = pattern.test(text);
    if (!result){
      is_valid= false;
      this.toast.error("Invalid Email","Error",{timeOut: 3000})
    }

    if (data.userTypeId == null  || data.userTypeId ==''){
      is_valid= false;
      this.toast.error("User Type cannot be empty","Error",{timeOut: 3000})
    }
    
    if (data.statusId == null  || data.statusId ==''){
      is_valid= false;
      this.toast.error("Status cannot be empty","Error",{timeOut: 3000})
    }

    if (data.genderId == null  || data.genderId ==''){
      is_valid= false;
      this.toast.error("Gender cannot be empty","Error",{timeOut: 3000})
    }
    if (data.maritalStatusId == null  || data.maritalStatusId ==''){
      is_valid= false;
      this.toast.error("Marital Status cannot be empty","Error",{timeOut: 3000})
    }
  

    if(is_valid){
      this.userService.registerUser(data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("Saved User => ", data.body);
          let userNic = data.body.nic;
          this.toast.success("User Registerd ","Success",{timeOut: 3000});
          if (data.body.userType.userType == 'user'){
            return this.route.navigateByUrl("/teacherRegistration/"+userNic);
          }
          
          return false;
        },
        error => {
          console.log(error.error.message);
          this.toast.error(error.error.message,"Error",{timeOut: 3000});
        }
      );

    }

    // Return if form is invalid
    // if (this.addUserForm.invalid) {
    //   return;
    // }


    // console.log('Submit', this.addUserForm.value);

    // axios.post('http://localhost:8080/', this.addUserForm.value).then(resp => {

  //     console.log(resp);
  // });


//after save
//   return this.route.navigateByUrl('/teacherRegistration/'+'9326');
  // let url = "/teacherRegistration/"+"1232343V";
  // window.location.href = url;


  }

  getAllCities() {
    this.commonService.getAllCity()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all cities => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const c = data.body[i];
            const city = {
              id: c.idcity,
              name: c.name
            }
            this.cityList.push(city);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  getAllUserType() {
    this.commonService.getAllUserTypes()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all user types => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const u = data.body[i];
            const userType = {
              id: u.iduserType,
              name: u.userType
            }
            this.userTypeList.push(userType);

          }
          console.log(this.userTypeList);

        },
        error => {
          console.log(error);
        }
      );
  }

  getAllStatus() {
    this.commonService.getAllStatus()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all status => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const s = data.body[i];
            const status = {
              id: s.idstatus,
              name: s.status
            }
            this.statusList.push(status);

          }
          console.log(this.statusList);

        },
        error => {
          console.log(error);
        }
      );
  }
}
