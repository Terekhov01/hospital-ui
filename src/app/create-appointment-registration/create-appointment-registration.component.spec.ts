import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentRegistrationComponent } from './create-appointment-registration.component';

describe('CreateAppointmentRegistrationComponent', () => {
  let component: CreateAppointmentRegistrationComponent;
  let fixture: ComponentFixture<CreateAppointmentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppointmentRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
