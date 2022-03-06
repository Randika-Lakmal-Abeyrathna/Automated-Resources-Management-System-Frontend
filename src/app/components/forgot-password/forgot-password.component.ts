import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordService} from "../../service/forgot-password.service";
import {first} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private forgotPasswordService:ForgotPasswordService,
              private router:Router,
              private toast:ToastrService) { }

  isFormSubmit = false;

  ngOnInit(): void {

    this.forgotPasswordForm = this.formBuilder.group({
      nic: ['', [Validators.required]]
    });
  }

  forgot(){
    // Set flag to true
    this.isFormSubmit = true;

    // Return if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const data = {
      nic: this.forgotPasswordForm.value.nic,
    }

    this.forgotPasswordService.forgotPassword(data)
      .pipe(first())
      .subscribe(
        (data:HttpResponse<any> )=> {
          this.toast.success("Recovery email is sent","Success",{timeOut: 3000})
          return this.router.navigateByUrl("/login");
        },
        error => {
          this.toast.error(error.error.message,"Error",{timeOut: 3000})
        }
      );

  }

}
