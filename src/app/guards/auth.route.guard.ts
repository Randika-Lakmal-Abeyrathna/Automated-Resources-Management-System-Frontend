import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginServiceService } from "../service/login-service.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthRouteGuard implements CanActivate {


  constructor(private loginService: LoginServiceService, private route: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userData = this.loginService.userInfo.getValue();

    console.log("userData", userData);
    if (userData && userData.userid) {
      console.log("url", state.url);
      console.log("User Role =>", userData.user_role);
      if (state.url.indexOf("/dashboard") > -1 ) {
        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
        
      }
      if (state.url.indexOf("/register") > -1 ) {
        if(userData.user_role == 'ROLE_DATAENTRY'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/admin") > -1 ) {
        if(userData.user_role == 'ROLE_ADMIN'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }
      if (state.url.indexOf("/superadmin") > -1) {
        if(userData.user_role == 'ROLE_SUPERADMIN'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }
      if (state.url.indexOf("/dataentry") > -1 ) {
        if(userData.user_role == 'ROLE_DATAENTRY'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }
      if (state.url.indexOf("/schooldetail") > -1 ) {
        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/teacherRegistration/") > -1) {
        if(userData.user_role == 'ROLE_DATAENTRY'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }


      if (state.url.indexOf("/admin-approve/:id") > -1){
        if(userData.user_role == 'ROLE_ADMIN'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/super-admin-approve/") > -1 ){
        if(userData.user_role == 'ROLE_SUPERADMIN'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/teacherRequest") > -1 ) {
        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }
      if (state.url.indexOf("/schoolRegistration") > -1) {
        if(userData.user_role == 'ROLE_DATAENTRY'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/schools") > -1) {
        if(userData.user_role == 'ROLE_DATAENTRY'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/teacherupdate") > -1 ) {

        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/teacher-onboard") > -1 ) {

        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/teacher-leave") > -1 ) {

        if(userData.user_role == 'ROLE_USER'){
          return true;
        }else{
          this.route.navigateByUrl('/denied');
          return false;
        }
      }

      if (state.url.indexOf("/change-password") > -1 ) {
        return true;
      }

      if (state.url.indexOf("/login") > -1) {
        if (userData.user_role == 'ROLE_SUPERADMIN') {
          this.route.navigateByUrl('/superadmin');
          return false;
        } else if (userData.user_role == 'ROLE_DATAENTRY') {
          this.route.navigateByUrl('/dataentry');
          return false;
        } else if (userData.user_role == 'ROLE_ADMIN') {
          this.route.navigateByUrl('/admin');
          return false;
        } else {
          this.route.navigateByUrl('/dashboard');
          return false;
        }

      }

      if (state.url.indexOf("/forgot") > -1) {
        if (userData.user_role == 'ROLE_SUPERADMIN') {
          this.route.navigateByUrl('/superadmin');
          return false;
        } else if (userData.user_role == 'ROLE_DATAENTRY') {
          this.route.navigateByUrl('/dataentry');
          return false;
        } else if (userData.user_role == 'ROLE_ADMIN') {
          this.route.navigateByUrl('/admin');
          return false;
        } else {
          this.route.navigateByUrl('/dashboard');
          return false;
        }
      }

    } else {
      if (state.url.indexOf("dashboard") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("register") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("admin") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("superadmin") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("dataentry") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("schooldetail") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("teacherupdate") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }


      if (state.url.indexOf("/admin-approve/:id") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("/super-admin-approve/") > -1){
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("teacherRegistration") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("teacherRequest") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("schoolRegistration") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("schools") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("teacher-onboard") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }
      if (state.url.indexOf("teacher-leave") > -1) {
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("/change-password") > -1 ) {
        this.route.navigateByUrl("/login");
        return false;
      }

      if (state.url.indexOf("/login") > -1) {
        return true;
      }
      if (state.url.indexOf("/forgot") > -1) {
        return true;
      }
    }

    return false;

  }

}
