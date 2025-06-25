import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovetokenforsaledialogComponent } from './approvetokenforsaledialog.component';

describe('ApprovetokenforsaledialogComponent', () => {
  let component: ApprovetokenforsaledialogComponent;
  let fixture: ComponentFixture<ApprovetokenforsaledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovetokenforsaledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovetokenforsaledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
