import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawtoauctioneerdialogComponent } from './withdrawtoauctioneerdialog.component';

describe('WithdrawtoauctioneerdialogComponent', () => {
  let component: WithdrawtoauctioneerdialogComponent;
  let fixture: ComponentFixture<WithdrawtoauctioneerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawtoauctioneerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawtoauctioneerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
