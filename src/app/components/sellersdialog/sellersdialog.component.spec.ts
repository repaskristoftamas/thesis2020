import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersdialogComponent } from './sellersdialog.component';

describe('SellersdialogComponent', () => {
  let component: SellersdialogComponent;
  let fixture: ComponentFixture<SellersdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
