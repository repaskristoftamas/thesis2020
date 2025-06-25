import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherpricedisplayComponent } from './etherpricedisplay.component';

describe('EtherpricedisplayComponent', () => {
  let component: EtherpricedisplayComponent;
  let fixture: ComponentFixture<EtherpricedisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherpricedisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherpricedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
