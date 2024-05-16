import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/loginResponse';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  @Output() logginSuccess = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<HttpResponse<LoginResponse>> {
    return this.httpClient
      .post<LoginResponse>(
        environment.url + '/login',
        {
          username: username,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        map((res) => {
          if (res.body != null) {
            localStorage.setItem('token', res.body.token);
            localStorage.setItem('teacher', JSON.stringify(res.body.teacher));
            this.logginSuccess.emit(true);
          }

          return res;
        })
      );
  }

  doLogout() {
    localStorage.clear();
  }
}
