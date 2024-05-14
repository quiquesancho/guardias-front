import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    return this.httpClient.post<LoginResponse>(
      environment.url + '/login',
      {
        username: username,
        password: password,
      },
      { observe: 'response' }
    );
  }
}
