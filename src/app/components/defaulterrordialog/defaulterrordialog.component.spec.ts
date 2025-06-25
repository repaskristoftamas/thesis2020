import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulterrordialogComponent } from './defaulterrordialog.component';

describe('DefaulterrordialogComponent', () => {
  let component: DefaulterrordialogComponent;
  let fixture: ComponentFixture<DefaulterrordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaulterrordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulterrordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
