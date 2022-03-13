import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponceemailComponent } from './responceemail.component';

describe('ResponceemailComponent', () => {
  let component: ResponceemailComponent;
  let fixture: ComponentFixture<ResponceemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponceemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponceemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
