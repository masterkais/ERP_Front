import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationServiceService } from './authentification-service.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService:AuthentificationServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=this.authenticationService.getToken();
    if(token!==null){
      let clone=req.clone({
        headers: req.headers.set('Authorization',token)
      });
      console.log(clone);
      return next.handle(clone);
    }
    return next.handle(req);
  }
}

export const TokenInterceptorProvider = {
provide:HTTP_INTERCEPTORS,
useClass: InterceptorService,
multi: true,
}
