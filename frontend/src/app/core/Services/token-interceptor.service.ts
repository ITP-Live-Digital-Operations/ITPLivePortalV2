import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private zone: NgZone) {}

  token: any;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    let jwttoken = req.clone({
      setHeaders: {
        Authorization: '' + this.token,
      },
    });
    return next
      .handle(jwttoken)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(err: HttpEvent<any>): Observable<any> {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      // JWT expired, go to login
      this.zone.run(() => this.router.navigate(['/login']));
    }

    // If it's not an authentication error, just throw it
    return throwError(err);
  }
}
