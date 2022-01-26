import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleApplyPatternComponent } from './schedule-apply-pattern.component';

describe('ApplySchedulePatternComponent', () => {
  let component: ScheduleApplyPatternComponent;
  let fixture: ComponentFixture<ScheduleApplyPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleApplyPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleApplyPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
