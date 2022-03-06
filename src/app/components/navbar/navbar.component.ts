import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogedIn = false;
  userLogOut = true;
  constructor(private loginService:LoginServiceService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.userLogedIn =true;
        this.userLogOut = false;
      }else{
        this.userLogedIn= false;
        this.userLogOut=true;
      }
    })
  }


  logout(){
    this.userLogedIn=false;
    this.userLogOut=true;
   this.loginService.logout();

  }


}
