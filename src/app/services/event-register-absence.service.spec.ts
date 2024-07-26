import { TestBed } from '@angular/core/testing';

import { EventRegisterAbsenceService } from './event-register-absence.service';

describe('EventRegisterAbsenceService', () => {
  let service: EventRegisterAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRegisterAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
