import { TestBed } from '@angular/core/testing';

import { DoctorSharedShortInformationService } from './doctor-shared-short-information.service';

describe('DoctorSharedShortInformationService', () => {
  let service: DoctorSharedShortInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorSharedShortInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
