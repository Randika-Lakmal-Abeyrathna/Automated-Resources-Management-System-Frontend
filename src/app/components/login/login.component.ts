import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../service/login-service.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor( private formBuilder: FormBuilder, private loginService: LoginServiceService, private http:HttpClient,
               private router:Router) { }

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

    const data = {
      username: this.loginForm.value.nic,
      password: this.loginForm.value.password,
    }

    this.loginService.login(data)
      .pipe(first())
      .subscribe(
      (data:HttpResponse<any> )=> {
        console.log(data.headers.get('Authorization'));
        this.loginService.checkAccesstoken(data.headers.get('Authorization'));



      },
        error => {
        console.log("error");
        }
    );


  }

}
