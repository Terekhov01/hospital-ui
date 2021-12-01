import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContrComponent } from './edit-contr.component';

describe('EditContrComponent', () => {
  let component: EditContrComponent;
  let fixture: ComponentFixture<EditContrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
