import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertokenforsaledialogComponent } from './transfertokenforsaledialog.component';

describe('TransfertokenforsaledialogComponent', () => {
  let component: TransfertokenforsaledialogComponent;
  let fixture: ComponentFixture<TransfertokenforsaledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertokenforsaledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertokenforsaledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
