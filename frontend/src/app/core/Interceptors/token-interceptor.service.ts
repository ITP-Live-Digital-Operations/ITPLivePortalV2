import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  token = localStorage.getItem('token');


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let jwttoken = req.clone({
      setHeaders:{
        Authorization: ''+ this.token,
      }
    });
    return next.handle(jwttoken);

  }

}
