import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor( private formBuilder: FormBuilder ) { }

  isFormSubmitted = false;
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      nic: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  login(){
    // Set flag to true
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Submit', this.loginForm.value);
  }

}
