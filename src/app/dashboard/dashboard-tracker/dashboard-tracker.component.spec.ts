import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrackerComponent } from './dashboard-tracker.component';

describe('DashboardTrackerComponent', () => {
  let component: DashboardTrackerComponent;
  let fixture: ComponentFixture<DashboardTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
