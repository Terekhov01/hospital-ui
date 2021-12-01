import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HereditaryComponent } from './hereditary.component';

describe('HereditaryComponent', () => {
  let component: HereditaryComponent;
  let fixture: ComponentFixture<HereditaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HereditaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HereditaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
