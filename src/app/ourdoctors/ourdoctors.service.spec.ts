import {TestBed} from '@angular/core/testing';

import {OurdoctorsService} from './ourdoctors.service';

describe('OurdoctorsService', () => {
  let service: OurdoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurdoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
