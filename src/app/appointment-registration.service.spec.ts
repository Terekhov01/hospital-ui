import { TestBed } from '@angular/core/testing';

import { AppointmentRegistrationService } from './appointment-registration.service';

describe('AppointmentRegistrationService', () => {
  let service: AppointmentRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
