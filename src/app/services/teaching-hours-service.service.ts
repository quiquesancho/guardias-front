import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeachingHours } from '../interfaces/teaching-hours';
import { TeachingHoursResponse } from '../interfaces/teachingHoursResponse';

@Injectable({
  providedIn: 'root'
})
export class TeachingHoursServiceService {

  constructor(private httpClient: HttpClient) { }

  getTeachingHours(): Observable<TeachingHoursResponse> {
    return this.httpClient.get<TeachingHoursResponse>(`${environment.url}/teachingHours`)
  }
}
