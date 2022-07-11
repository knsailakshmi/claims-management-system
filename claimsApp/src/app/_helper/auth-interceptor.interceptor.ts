import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const TOKEN_HEADER_KEY='Authorization';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private token:TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq=request;
    const token=this.token.getToken();
    console.log("inside the token");
    
    console.log(token)
    if(token!=null){
      authReq=request.clone({headers:request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders=[
  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorInterceptor,multi:true}
]
