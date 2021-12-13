import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRegistrationListComponent } from './appointment-registration-list.component';

describe('AppointmentRegistrationListComponent', () => {
  let component: AppointmentRegistrationListComponent;
  let fixture: ComponentFixture<AppointmentRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRegistrationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
