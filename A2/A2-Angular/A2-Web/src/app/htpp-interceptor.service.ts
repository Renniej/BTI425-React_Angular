import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HtppInterceptorService implements HttpInterceptor {

  constructor(private router : Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(catchError(this.errorHandler));
  };

  errorHandler(error : HttpErrorResponse){
    console.log(error.message);
   
    window.location.href = 'error';
    
    return throwError(error.message ||  "Server error") 
}


}
