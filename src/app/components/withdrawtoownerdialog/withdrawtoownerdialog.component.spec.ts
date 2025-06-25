import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawtoownerdialogComponent } from './withdrawtoownerdialog.component';

describe('WithdrawtoownerdialogComponent', () => {
  let component: WithdrawtoownerdialogComponent;
  let fixture: ComponentFixture<WithdrawtoownerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawtoownerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawtoownerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
