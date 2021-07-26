import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService, private alertService: AlertService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      reportProgress: true
    });

    if (request.url.includes(environment.hostAPI)) {
      this.loadingService.setLoading(true, request.url);
      
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          // Alert Handling
          if (error instanceof HttpErrorResponse) {
            if (error.status.toString().startsWith('5')) {  
              this.alertService.error(error.error ? error.error.message ? error.error.message : '!Technical Error!' : '!Technical Error!');
            } else if (error.status === 400) {
              this.alertService.error(error.error ? error.error.message ? error.error.message : '!BAD REQUEST!' : '!BAD REQUEST!');
            } else if (error.status === 404) {
              this.alertService.error(error.error ? error.error.message ? error.error.message : '!METHOD NOT FOUND!' : '!METHOD NOT FOUND!');
            } else {
              this.alertService.error(error.error ? error.error.message ? error.error.message : '!SYSTEM ERROR!' : '!SYSTEM ERROR!');
            }
          }

          return throwError(error);
        }),
        finalize(() => {
          this.loadingService.setLoading(false, request.url);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
