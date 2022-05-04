import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { first } from 'rxjs/operators';
import { ForgotPasswordService } from 'src/app/service/forgot-password.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user = {
    userid:''
  }
  changePasswordForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private forgotPasswordService:ForgotPasswordService,
              private router:Router,
              private toast:ToastrService,
              private loginService:LoginServiceService,
              private userService:UserService) { }

  isFormSubmit = false;

  ngOnInit(): void {

    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
      }


    });
    
    this.changePasswordForm = this.formBuilder.group({
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  changePassword(){
    // Set flag to true
    this.isFormSubmit = true;

    // Return if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    const data = {
      nic:this.user.userid,
      newPassword1: this.changePasswordForm.value.password1,
      newPassword2:this.changePasswordForm.value.password2
    }

    var flag = true;
    if(this.changePasswordForm.value.password1 != this.changePasswordForm.value.password2){
      this.toast.error("Password Mismatch","Error",{timeOut: 3000});
      flag =false;
    }
    if(this.changePasswordForm.value.password1 == '' || this.changePasswordForm.value.password1==null){
      this.toast.error("Password cannot be empty","Error",{timeOut: 3000});
      flag =false;
    }
    
    if (flag){
      this.userService.changePassword(data)
      .pipe(first())
      .subscribe(
        (data:HttpResponse<any> )=> {
          this.toast.success("Password Changed","Success",{timeOut: 3000});
          this.loginService.logout();
        },
        error => {
          this.toast.error(error.error.message,"Error",{timeOut: 3000})
        }
      );

    }

    

  }

}
