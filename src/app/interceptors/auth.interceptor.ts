import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', token),
      });

      return next.handle(cloned).pipe(tap(event => {
        if(event instanceof HttpResponse){
         if(event.status == 403){
          localStorage.clear();
          this.router.navigate(['/login'])
         }
        }
      }));
    } else {
      return next.handle(request);
    }
  }
}
