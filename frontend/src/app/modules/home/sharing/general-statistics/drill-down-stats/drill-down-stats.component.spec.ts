import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDownStatsComponent } from './drill-down-stats.component';

describe('DrillDownStatsComponent', () => {
  let component: DrillDownStatsComponent;
  let fixture: ComponentFixture<DrillDownStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillDownStatsComponent]
    });
    fixture = TestBed.createComponent(DrillDownStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
