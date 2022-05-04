import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginServiceService} from "../service/login-service.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginServiceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userData = this.loginService.userInfo.getValue();
    if (userData){
        const newRequest =req.clone({
          headers:req.headers.set("Authorization",`Bearer ${userData.access_token}`)
          .set("Access-Control-Allow-Origin", "*")
          .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        });
        return next.handle(newRequest)
    }
    return next.handle(req);

  }

}
