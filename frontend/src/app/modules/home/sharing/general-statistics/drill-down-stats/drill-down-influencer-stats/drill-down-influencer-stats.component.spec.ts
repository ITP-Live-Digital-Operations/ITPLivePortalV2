import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDownInfluencerStatsComponent } from './drill-down-influencer-stats.component';

describe('DrillDownInfluencerStatsComponent', () => {
  let component: DrillDownInfluencerStatsComponent;
  let fixture: ComponentFixture<DrillDownInfluencerStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrillDownInfluencerStatsComponent]
    });
    fixture = TestBed.createComponent(DrillDownInfluencerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
