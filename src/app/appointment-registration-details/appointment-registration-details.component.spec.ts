import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRegistrationDetailsComponent } from './appointment-registration-details.component';

describe('AppointmentRegistrationDetailsComponent', () => {
  let component: AppointmentRegistrationDetailsComponent;
  let fixture: ComponentFixture<AppointmentRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRegistrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
