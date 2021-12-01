import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrComponent } from './contr.component';

describe('ContrComponent', () => {
  let component: ContrComponent;
  let fixture: ComponentFixture<ContrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
