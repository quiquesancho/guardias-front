import { TestBed } from '@angular/core/testing';

import { TeachingHoursServiceService } from './teaching-hours-service.service';

describe('TeachingHoursServiceService', () => {
  let service: TeachingHoursServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachingHoursServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
