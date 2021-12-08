import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMultiSelectorComponent } from './material-multi-selector.component';

describe('MaterialMultiSelectorComponent', () => {
  let component: MaterialMultiSelectorComponent;
  let fixture: ComponentFixture<MaterialMultiSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMultiSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
