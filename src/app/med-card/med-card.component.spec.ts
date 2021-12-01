import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedCardComponent } from './med-card.component';

describe('MedCardComponent', () => {
  let component: MedCardComponent;
  let fixture: ComponentFixture<MedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
