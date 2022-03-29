import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatisticEmploymentComponent } from './doctor-statistic-employment.component';

describe('DoctorStatisticEmploymentComponent', () => {
  let component: DoctorStatisticEmploymentComponent;
  let fixture: ComponentFixture<DoctorStatisticEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatisticEmploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorStatisticEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
