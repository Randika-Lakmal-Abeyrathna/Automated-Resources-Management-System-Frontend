import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "../../service/teacher.service";
import { ToastrService } from "ngx-toastr";
import { first } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css']
})
export class TeacherRegistrationComponent implements OnInit {

  // Initializing User Form
  // registerForm!: FormGroup;

  // Flag to check if form submitted by user to handle error messages
  isFormSubmitted = false;

  register = {
    userNic: '',
    schoolId: '',
    appointmentDate: '',
    retireDate: '',
    teacherTypeId: 3
  }

  schoolList: any = [];

  constructor(
    private formBuilder: FormBuilder, private toast: ToastrService, private teacherService: TeacherService,
    private loginService: LoginServiceService, private commonService: CommonService, private route:Router

  ) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value) {
        this.getAllSchools();
      }

    })

  }

  // Submit teacher Form
  submitTeacher(data: any) {
    console.log("register data ", data);
    // Set flag to true
    let is_valid = true;

    if (data.userNic == null || data.userNic == '') {
      is_valid = false;
      this.toast.error("User NIC cannot be empty", "Error", { timeOut: 3000 })
    }
    if (data.schoolId == null || data.schoolId == '') {
      is_valid = false;
      this.toast.error("School name cannot be empty", "Error", { timeOut: 3000 })
    }
    if (data.appointmentDate == null || data.appointmentDate == '') {
      is_valid = false;
      this.toast.error("Select appointment date", "Error", { timeOut: 3000 })
    }
    if (data.teacherTypeId == null || data.teacherTypeId == 0) {
      is_valid = false;
      this.toast.error("Select teacher type", "Error", { timeOut: 3000 })
    }
    data.retireDate = "";

    if (is_valid) {
      this.teacherService.requestRegisterTeacher(data)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.toast.success("Registered The Teacher Successfully", "Success", { timeOut: 3000 })

          },
          error => {
            console.log(error);
          }
        );

    }
    // console.log('Submit', this.addTeacherForm.value);
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

  // cancel() {
      // this.route.navigateByUrl('/dashboard');
      // this.registerForm.reset();
    
  // }

}
