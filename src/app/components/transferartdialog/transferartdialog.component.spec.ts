import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferartdialogComponent } from './transferartdialog.component';

describe('TransferartdialogComponent', () => {
  let component: TransferartdialogComponent;
  let fixture: ComponentFixture<TransferartdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferartdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferartdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
