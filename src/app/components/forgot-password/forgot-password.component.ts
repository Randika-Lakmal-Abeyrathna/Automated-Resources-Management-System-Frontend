import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  isFormSubmit = false;

  ngOnInit(): void {

    this.forgotPasswordForm = this.formBuilder.group({
      nic: ['', [Validators.required]]
    });
  }

  reset(){
    // Set flag to true
    this.isFormSubmit = true;

    // Return if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    console.log('data', this.forgotPasswordForm.value);
  }

}
