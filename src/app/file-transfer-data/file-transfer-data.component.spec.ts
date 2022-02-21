import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTransferDataComponent } from './file-transfer-data.component';

describe('FileTransferDataComponent', () => {
  let component: FileTransferDataComponent;
  let fixture: ComponentFixture<FileTransferDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTransferDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
