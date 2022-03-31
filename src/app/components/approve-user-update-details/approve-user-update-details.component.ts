import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {UserService} from "../../service/user.service";
import {TeacherService} from "../../service/teacher.service";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-approve-user-update-details',
  templateUrl: './approve-user-update-details.component.html',
  styleUrls: ['./approve-user-update-details.component.css']
})
export class ApproveUserUpdateDetailsComponent implements OnInit {

  data: string ='';
  user = {
    userid:''
  }

  updateUserDetails = {
    id:0,
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

  pendingApproveData:Array<any> =[];
  constructor(private loginService:LoginServiceService,private userService:UserService,private teacherService:TeacherService,
              private formBuilder: FormBuilder,private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
        this.loadPendingApprovalDetails(this.user.userid);
      }


    })
  }

  loadPendingApprovalDetails(userid:string){
    this.teacherService.getPendingUserUpdateForPrincipal(userid)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          console.log(data);
          for (let i = 0; i < data.body.length; i++) {
            const userData = data.body[i];
            let allUserData ={
              id:userData['id'],
              name:userData['user']['firstName']+' - '+userData['user']['lastName'],
              nic:userData['user']['nic'],
              email:userData['user']['email']
            }
            this.pendingApproveData.push(allUserData);
          }
    console.log(this.pendingApproveData);
        },
        error=>{
          console.log(error);
        }
      );
  }

  viewData(id:number){
    this.teacherService.getUpdateUserDetailById(id)
      .pipe(first())
      .subscribe(
        (data:any)=>{
              const updateData =data.body;
              this.updateUserDetails.id=updateData.id;
              this.updateUserDetails.firstName=updateData.firstName;
              this.updateUserDetails.middleName=updateData.middleName;
              this.updateUserDetails.lastName=updateData.lastName;
              this.updateUserDetails.addressNo=updateData.addressNo;
              this.updateUserDetails.addressStreet1=updateData.addressStreet;
              this.updateUserDetails.addressStreet2=updateData.addressStreet2;
              this.updateUserDetails.city=updateData.city.name;
              this.updateUserDetails.contactNumber1=updateData.contactNumber1;
              this.updateUserDetails.contactNumber2=updateData.contactNumber2;
              this.updateUserDetails.email=updateData.email;
              this.updateUserDetails.gender=updateData.gender.gender;
              this.updateUserDetails.salutation=updateData.salutation.salutation;
              this.updateUserDetails.maritalStatus=updateData.maritalStatus.status;

        },
        error=>{
          console.log(error);
        }
      );
  }

  approve(id:number){

    this.teacherService.approveUserDetails(id)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.toast.success("User Update Details Updated","Success",{timeOut: 3000});
          setTimeout(()=>{
            return window.location.reload();
          }, 1000);

        },
        error=>{
          console.log(error);
        }
      );

  }

  reject(id:number,reason:string){
    const details = {
      reason : reason,
      id:id
    }

    this.teacherService.rejectUserDetails(details)
      .pipe(first())
      .subscribe(
        (data:any)=>{
            this.toast.success("User Update Details Rejected","Success",{timeOut: 3000});
          setTimeout(()=>{
            return window.location.reload();
          }, 1000);



        },
        error=>{
          console.log(error);
        }
      );

  }

}
