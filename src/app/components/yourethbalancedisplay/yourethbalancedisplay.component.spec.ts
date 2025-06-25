import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourethbalancedisplayComponent } from './yourethbalancedisplay.component';

describe('YourethbalancedisplayComponent', () => {
  let component: YourethbalancedisplayComponent;
  let fixture: ComponentFixture<YourethbalancedisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourethbalancedisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourethbalancedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
