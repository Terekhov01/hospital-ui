import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuestionEmailComponent } from './send-question-email.component';

describe('SendQuestionEmailComponent', () => {
  let component: SendQuestionEmailComponent;
  let fixture: ComponentFixture<SendQuestionEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQuestionEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQuestionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
