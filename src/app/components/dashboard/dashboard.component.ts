import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../../service/login-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = {
    userid:''
  }

  constructor(private loginService:LoginServiceService) { }

  ngOnInit(): void {
    this.loginService.userInfo.subscribe(value => {
      if (value){
        this.user.userid = value.userid;
      }


    })

  }

}
