import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDateRangePickerComponent } from './material-date-range-picker.component';

describe('MaterialDatePickerComponent', () => {
  let component: MaterialDateRangePickerComponent;
  let fixture: ComponentFixture<MaterialDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialDateRangePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
