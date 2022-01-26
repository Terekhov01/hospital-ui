import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCreatePatternComponent } from './schedule-create-pattern.component';

describe('ScheduleProlongPageComponent', () => {
  let component: ScheduleCreatePatternComponent;
  let fixture: ComponentFixture<ScheduleCreatePatternComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCreatePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
