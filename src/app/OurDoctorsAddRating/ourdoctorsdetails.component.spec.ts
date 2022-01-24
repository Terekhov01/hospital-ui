import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OurdoctorsdetailsComponent} from './ourdoctorsdetails.component';

describe('OurdoctorsdetailsComponent', () => {
  let component: OurdoctorsdetailsComponent;
  let fixture: ComponentFixture<OurdoctorsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurdoctorsdetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurdoctorsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
