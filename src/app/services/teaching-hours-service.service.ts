import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeachingHours } from '../interfaces/teaching-hours';

@Injectable({
  providedIn: 'root'
})
export class TeachingHoursServiceService {

  constructor(private httpClient: HttpClient) { }

  getTeachingHours(): Observable<TeachingHours[]> {
    return this.httpClient.get<TeachingHours[]>(environment.url+"/teachingHours")
  }
}
