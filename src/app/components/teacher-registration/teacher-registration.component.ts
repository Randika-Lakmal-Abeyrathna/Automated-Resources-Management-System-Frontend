import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "../../service/teacher.service";
import { ToastrService } from "ngx-toastr";
import { first } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { CommonService } from 'src/app/service/common.service';
// import { error } from "console";

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

  id: any | null;

  register ={
      userNic: '',
      schoolId: '',
      appointmentDate: '',
      retireDate: '',
      teacherTypeId: 3
  };
  schoolList: any = [];

  subjectsList: any = [];
  selectedSubject: any;
  selectedSubjectsList: any = [];

  selectedSchool: any;
  selectedAppointedDate: any = [];
  selectedEndDate: any = [];
  selectedExperienceList: any = [];
  qualification: any;

  constructor(
    private formBuilder: FormBuilder, private toast: ToastrService, private teacherService: TeacherService,
    private loginService: LoginServiceService, private commonService: CommonService, private route: Router,
    private _Activatedroute:ActivatedRoute

  ) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
       this.id = params.get('id'); 
       console.log(this.id);
       this.register.userNic = this.id;
   });


    this.loginService.userInfo.subscribe(value => {
      if (value) {
        this.getAllSchools();
        this.getSubjects();
      }

    })

  }

  // Submit teacher Form
  submitTeacher(data: any) {
    console.log("register data ", data);
    // Set flag to true
    let is_valid = true;

    let subjectRequestList: any = [];

    const teacherQualificationRequest: any = {
      qualification: this.qualification
    }

    const teacherSubjectRequest: any = {
      subjectId: 1
    }

    if (this.selectedSubjectsList.length > 0) {

      for (let sub of this.selectedSubjectsList) {

        const teacherSubjectRequest: any = {
          subjectId: sub.id
        }

        subjectRequestList.push(teacherSubjectRequest);
      }
    }

    data.teacherQualificationRequest = teacherQualificationRequest;
    data.teacherSubjectRequest = subjectRequestList;
    data.teacherFormerExperienceRequest = this.selectedExperienceList;

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
            console.log(data)
            if(data?.body?.status == 200){

            this.toast.error(data?.body?.message, "Error", { timeOut: 3000 })
            this.clear()
            }else{

              this.toast.success("Registered The Teacher Successfully", "Success", { timeOut: 3000 })
              this.clear()
            }
 
          },
          error => {
            console.log(error);
            this.clear();
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

  getSubjects() {
    this.commonService.getAllSubjects()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("all subjects => ", data.body);

          for (let i = 0; i < data.body.length; i++) {
            const s = data.body[i];
            const subject = {
              id: s.id,
              name: s.name
            }
            this.subjectsList.push(subject);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  onSubjectsSelect(event: any) {
    console.log("before >>>>>>" ,this.selectedSubjectsList)
    console.log(event);
    if (this.selectedSubjectsList.includes(event) === false) {
      this.selectedSubjectsList.push(event);
    }
    console.log("after >>>>>>" ,this.selectedSubjectsList)
  }

  removeSubjectfromSelected(event: any) {

    console.log("before >>>>>>" ,this.selectedSubjectsList)
    this.selectedSubjectsList.splice(event, 1);
    console.log("after >>>>>>" ,this.selectedSubjectsList)
  }

  formerExperienceAddition() {

    const experience: any = {
      schoolId: this.selectedSchool,
      appointmentDate: this.selectedAppointedDate,
      appointmentEndDate: this.selectedEndDate
    }

    console.log(experience)
    if (this.selectedSchool != undefined && (this.selectedAppointedDate.length > 0 && this.selectedEndDate.length > 0)) {

      if (this.selectedExperienceList.length > 0) {

        for (let exp of this.selectedExperienceList) {

          if (exp.schoolId === experience.schoolId) {

            break;

          } else {

            this.selectedExperienceList.push(experience)
          }
          // console.log(exp)
        }
      } else {

        this.selectedExperienceList.push(experience)
      }

    }

  }

  removeExperiencefromSelected(event: any) {
    this.selectedExperienceList.splice(event, 1);
  }

  clear() {

    this.selectedSubjectsList = [];
    this.selectedExperienceList = [];

    // this.ngOnInit();
  }

}
