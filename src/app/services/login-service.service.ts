import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../interfaces/teacher';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<Teacher>> {
    return this.httpClient.post<Teacher>(
      environment.url + '/login',
      {
        username: username,
        password: password,
      },
      { observe: 'response' }
    );
  }

  handleLoginResponse(response: HttpResponse<any>) {
    const jsessionId = this.getCookieValue(response, 'JSESSIONID');
    if (jsessionId) {
      sessionStorage.setItem('JSESSIONID', jsessionId);
    }
  }

  private getCookieValue(response: HttpResponse<any>, cookieName: string): string | null {
    const cookies = response.headers.getAll('Set-Cookie');
    if (cookies) {
      for (const cookie of cookies) {
        const cookieParts = cookie.split(';');
        for (const part of cookieParts) {
          const [key, value] = part.trim().split('=');
          if (key === cookieName) {
            return value;
          }
        }
      }
    }
    return null;
  }
}
