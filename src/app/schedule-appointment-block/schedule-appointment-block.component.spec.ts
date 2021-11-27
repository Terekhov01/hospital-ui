import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentBlockComponent } from './schedule-appointment-block.component';

describe('ScheduleAppointmentBlockComponent', () => {
  let component: ScheduleAppointmentBlockComponent;
  let fixture: ComponentFixture<ScheduleAppointmentBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAppointmentBlockComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAppointmentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
