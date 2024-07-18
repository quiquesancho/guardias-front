import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventResponse } from '../interfaces/event-response';

@Injectable({
  providedIn: 'root'
})
export class EventRegisterAbsenceService {
  private eventSource: EventSource | undefined;
  private sseDataSubject: Subject<EventResponse> = new Subject<EventResponse>();

  constructor() { }

  private connectToSSE() {
    this.eventSource = new EventSource(`${environment.url}/events/users/admin@admin.com`);
    console.log('creating event source');
    this.eventSource.addEventListener('message', (event) => {
      console.log('received event', event)
      this.sseDataSubject.next(event.data as EventResponse);
    });

    this.eventSource.onerror = error => {
      console.log('error', error);
      this.sseDataSubject.error(error);
      this.eventSource!.close();
      this.connectToSSE();
    };

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
