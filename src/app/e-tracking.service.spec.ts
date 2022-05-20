import { TestBed } from '@angular/core/testing';

import { ETrackingService } from './e-tracking.service';

describe('ETrackingService', () => {
  let service: ETrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ETrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
