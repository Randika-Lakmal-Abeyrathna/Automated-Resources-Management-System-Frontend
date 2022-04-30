import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SchoolService } from 'src/app/service/school.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.css']
})
export class SchoolRegistrationComponent implements OnInit {


  user = {
    userid:''
  }

  schoolRegistration ={
    name:'',
    cityId:'',
    zonalId:'',
    schoolTypeId:''
  }

  carderDetails = {
    subjectId:'',
    current :'',
    limitation:''
  }

  
  allCity:Array<any> =[];
  allZonal:Array<any> =[];
  allSchoolType:Array<any> =[];
  allSubject:Array<any> =[];

  allCarderDetails:Array<any> =[];

  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
    private commonService:CommonService,private toast:ToastrService,private router:Router,private schoolService:SchoolService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        
      }


    });

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
          this.allCity.push(city);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // City DropDown end

    // Zonal DropDown start
    this.commonService.getAllZonal().subscribe(
      (data:any )=> {
        console.log("zonal",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const z = data.body[i];
          const zonal = {
            id:z.idzonal,
            zonal:z.name
          }
          this.allZonal.push(zonal);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // zonal DropDown end

    // school type DropDown start
    this.commonService.getAllSchoolType().subscribe(
      (data:any )=> {
        console.log("School Type",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const st = data.body[i];
          const schoolType = {
            id:st.id,
            schoolType:st.type
          }
          this.allSchoolType.push(schoolType);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // school type DropDown end

    // Subjects DropDown start
    this.commonService.getAllSubjects().subscribe(
      (data:any )=> {
        console.log("Subjects",data.body);
        for (let i = 0; i < data.body.length; i++) {
          const s = data.body[i];
          const subject = {
            id:s.id,
            subject:s.id+'-'+s.name +' - ' +s.description
          }
          this.allSubject.push(subject);
        }
      },
      error => {
        if (error.status == 403){

        }

      }
    );
    // Subjects DropDown end


  }

  addCarder(data:any){
    console.log(data);
    let is_valid = true;
    if (data.subject == null || data.subject  ==''){
      is_valid= false;
      this.toast.error("Subject Cannot be empty","Error",{timeOut: 3000});
    }
    if (data.current == null || data.current  ==''){
      is_valid= false;
      this.toast.error("Current Teacher Value cannot be empty","Error",{timeOut: 3000});
    }
    if (data.limit == null || data.limit  ==''){
      is_valid= false;
      this.toast.error("Teacher Limit cannot be empty","Error",{timeOut: 3000});
    }
    
    for (let index = 0; index < this.allCarderDetails.length; index++) {
      const currentSubject = this.allCarderDetails[index].subject;

      if(currentSubject == data.subject){
        is_valid= false;
        this.toast.error("Duplicate Entry to Carder of Subject","Error",{timeOut: 3000});
        break;

      }
      
    }

    if(is_valid){
      this.allCarderDetails.push(data);
      

    }
  }

  registerSchool(data:any){
    console.log(data);
    let is_valid = true;
    if (data.schoolName == null || data.schoolName  ==''){
      is_valid= false;
      this.toast.error("School Name Cannot be empty","Error",{timeOut: 3000})
    }
    if (data.city == null || data.city  ==''){
      is_valid= false;
      this.toast.error("City Cannot be empty","Error",{timeOut: 3000})
    }
    if (data.zonal == null || data.zonal  ==''){
      is_valid= false;
      this.toast.error("Zonal Cannot be empty","Error",{timeOut: 3000})
    }
    if (data.schoolType == null || data.schoolType  ==''){
      is_valid= false;
      this.toast.error("School Type Cannot be empty","Error",{timeOut: 3000})
    }
    let schoolData ={
      name:data.schoolName,
      cityId:data.city,
      zonalId:data.zonal,
      schoolTypeId:data.schoolType
    }

    if(is_valid){
      this.schoolService.addSchool(schoolData)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log("after save school",data.body);
          console.log(this.allCarderDetails);
          let schoolId = data.body.idschool;
          for (let i = 0; i < this.allCarderDetails.length; i++) {
            const carder = this.allCarderDetails[i];

            let carderRequest ={
              limitation:carder.limit,
              current:carder.current,
              schoolId:schoolId,
              subjectId:carder.subject.split('-')[0]
            }

            this.schoolService.addCarderDetails(carderRequest)
            .pipe(first())
            .subscribe(
              (data:any)=>{
      
              },
              error=>{
                console.log(error);
              }
            );
      
        }
            
          
          this.toast.success("School Registration Success","Success",{timeOut: 3000});
        setTimeout(()=>{
          return this.router.navigateByUrl("/");
        }, 1000);



      },
      error=>{
        console.log(error);
      }
      );
    }


  }

  removeCarder(data:any){
    console.log(data);
    const index: number = this.allCarderDetails.indexOf(data);
    console.log("index",index);
    if (index !== -1) {
        this.allCarderDetails.splice(index, 1);
    } 

  }

}
