import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProlongPageComponent } from './schedule-prolong-page.component';

describe('ScheduleProlongPageComponent', () => {
  let component: ScheduleProlongPageComponent;
  let fixture: ComponentFixture<ScheduleProlongPageComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleProlongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
