import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHereditaryComponent } from './edit-hereditary.component';

describe('EditHereditaryComponent', () => {
  let component: EditHereditaryComponent;
  let fixture: ComponentFixture<EditHereditaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHereditaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHereditaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
