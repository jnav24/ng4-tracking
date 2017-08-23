import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTrackingComponent } from './dialog-tracking.component';

describe('DialogTrackingComponent', () => {
  let component: DialogTrackingComponent;
  let fixture: ComponentFixture<DialogTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
