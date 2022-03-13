import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatisticLineComponent } from './doctor-statistic-line.component';

describe('DoctorStatisticLineComponent', () => {
  let component: DoctorStatisticLineComponent;
  let fixture: ComponentFixture<DoctorStatisticLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatisticLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorStatisticLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
