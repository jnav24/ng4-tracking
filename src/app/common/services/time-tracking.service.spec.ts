import { TestBed, inject } from '@angular/core/testing';

import { TimeTrackingService } from './time-tracking.service';

describe('TimeTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeTrackingService]
    });
  });

  it('should be created', inject([TimeTrackingService], (service: TimeTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
