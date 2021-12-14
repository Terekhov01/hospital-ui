import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewPatternComponent } from './schedule-view-pattern.component';

describe('ScheduleViewPatternComponent', () => {
  let component: ScheduleViewPatternComponent;
  let fixture: ComponentFixture<ScheduleViewPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleViewPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
