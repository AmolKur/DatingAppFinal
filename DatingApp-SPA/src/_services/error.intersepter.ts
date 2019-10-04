import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  next.handle(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse) {
              const applicaionError = error.headers.get('Application-Error');
              if (applicaionError) {
                return throwError(applicaionError);
              }
              const serverError = error.error;
              let modelStateErrors = '';
              if (serverError && typeof serverError === 'object') {
                for (const key in serverError) {
                    if (serverError[key]) {
                     modelStateErrors += serverError[key] + '\n';
                    }
                }
              }
              return throwError(modelStateErrors || serverError || 'Server Error');
            }
        })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : ErrorInterceptor,
  multi : true
};
