import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentRegistrationComponent } from './update-appointment-registration.component';

describe('UpdateAppointmentRegistrationComponent', () => {
  let component: UpdateAppointmentRegistrationComponent;
  let fixture: ComponentFixture<UpdateAppointmentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppointmentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
