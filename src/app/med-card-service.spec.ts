import { TestBed } from '@angular/core/testing';

import { MedCardService } from './med-card.service';

describe('MedCardService', () => {
  let service: MedCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
