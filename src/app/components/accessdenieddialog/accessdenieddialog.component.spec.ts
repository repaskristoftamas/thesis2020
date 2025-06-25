import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessdenieddialogComponent } from './accessdenieddialog.component';

describe('AccessdenieddialogComponent', () => {
  let component: AccessdenieddialogComponent;
  let fixture: ComponentFixture<AccessdenieddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessdenieddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessdenieddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
