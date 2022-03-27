import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios, { Axios } from 'axios';

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

  


  constructor(
    private formBuilder: FormBuilder

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
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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
    
    axios.post('http://localhost:8080/', this.addUserForm.value).then(resp => {

      console.log(resp);
  });


  }


}