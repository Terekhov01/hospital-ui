import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTablePageComponent } from './schedule-table-page.component';

describe('ScheduleTableComponent', () => {
  let component: ScheduleTablePageComponent;
  let fixture: ComponentFixture<ScheduleTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
