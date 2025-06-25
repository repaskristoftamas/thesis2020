import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadnewartworkdialogComponent } from './uploadnewartworkdialog.component';

describe('UploadnewartworkdialogComponent', () => {
  let component: UploadnewartworkdialogComponent;
  let fixture: ComponentFixture<UploadnewartworkdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadnewartworkdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadnewartworkdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
