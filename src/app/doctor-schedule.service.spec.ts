import { TestBed } from '@angular/core/testing';

import { DoctorScheduleService } from './doctor-schedule.service';

describe('DoctorScheduleServiceService', () => {
  let service: DoctorScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
