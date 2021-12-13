import { TestBed } from '@angular/core/testing';

import { AppointmentRegistrationInfoService } from './appointment-registration-info.service';

describe('AppointmentRegistrationInfoService', () => {
  let service: AppointmentRegistrationInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentRegistrationInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
