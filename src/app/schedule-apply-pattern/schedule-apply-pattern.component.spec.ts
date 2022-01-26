import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplySchedulePatternComponent } from './schedule-apply-pattern.component';

describe('ApplySchedulePatternComponent', () => {
  let component: ApplySchedulePatternComponent;
  let fixture: ComponentFixture<ApplySchedulePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplySchedulePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplySchedulePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
