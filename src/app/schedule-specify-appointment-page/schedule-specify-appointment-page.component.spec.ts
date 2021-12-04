import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSpecifyAppointmentPageComponent } from './schedule-specify-appointment-page.component';

describe('ScheduleSpecifyAppointmentPageComponent', () => {
  let component: ScheduleSpecifyAppointmentPageComponent;
  let fixture: ComponentFixture<ScheduleSpecifyAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSpecifyAppointmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSpecifyAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
