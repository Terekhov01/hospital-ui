import { TestBed } from '@angular/core/testing';

import { PopUpMessageService } from './pop-up-message.service';

describe('ErrorHandlerService', () => {
  let service: PopUpMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
