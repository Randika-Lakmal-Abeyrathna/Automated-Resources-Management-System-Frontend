import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
// import axios, { Axios } from 'axios';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  // Initializing User Form
  addUserForm!: FormGroup;

  // Flag to check if form submitted by user to handle error messages
  isFormSubmitted = false;

  uRegister = {
      cityId: '',
      userTypeId: '',
      status: ''

  }

  cityList: any = [];
  userTypeList: any = [];
  statusList: any = [];


  constructor(
    private formBuilder: FormBuilder,private route: Router, private commonService: CommonService,private loginService: LoginServiceService

  ) { }

  ngOnInit(): void {

    // Patterns
    const PAT_NAME = "^[a-zA-Z ]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    // Defining Form Controlls with initial value and validations for each form controll
    this.addUserForm = this.formBuilder.group({
      firstName:['', [Validators.required]],
      middleName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      addressNo:['', [Validators.required]],
      addressStreet:['', [Validators.required]],
      addressStreet2:['', [Validators.required]],
      // city:[''],
      contactNumber1:['', [Validators.required]],
      contactNumber2:['', [Validators.required]],
      nic:['', [Validators.required]],
      // usertype:[''],
      // status:[''],
      // gender:[''],
      // marital:[''],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });

    this.loginService.userInfo.subscribe(value => {
      if (value) {
        this.getAllCities();
        this.getAllUserType();
        this.getAllStatus();
      }

    })
  }

  // Submit User Form
  submitUser() {

    // Set flag to true
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }


    console.log('Submit', this.addUserForm.value);

    // axios.post('http://localhost:8080/', this.addUserForm.value).then(resp => {

  //     console.log(resp);
  // });


//after save
//   return this.route.navigateByUrl('/teacherRegistration/'+'9326');
  let url = "/teacherRegistration/"+"1232343V";
  window.location.href = url;


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
