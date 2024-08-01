import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventResponse } from '../interfaces/event-response';
import { Teacher } from '../interfaces/teacher';

@Injectable({
  providedIn: 'root',
})
export class EventRegisterAbsenceService {
  private eventSource: EventSource | undefined;
  private sseDataSubject: Subject<EventResponse> = new Subject<EventResponse>();

  constructor() {}

  private connectToSSE() {
    let teacherJson = sessionStorage.getItem('teacher');
    if (teacherJson != null) {
      let teacher = JSON.parse(teacherJson) as Teacher;
      this.eventSource = new EventSource(`${environment.url}/events/users/${teacher.email}`);
      console.log('creating event source');
      this.eventSource.addEventListener('update', (event) => {
        console.log('received event', event);
        this.sseDataSubject.next(event.data as EventResponse);
      });

      this.eventSource.onerror = (error) => {
        console.log('error', error);
        this.sseDataSubject.error(error);
        this.eventSource!.close();
        this.connectToSSE();
      };
    }
  }

  subscribeToEvents(): Observable<EventResponse> {
    if (!this.eventSource) {
      this.connectToSSE();
    }
    return this.sseDataSubject.asObservable();
  }

  unsubscribeToEvents(): void {
    this.eventSource!.close();
  }
}
