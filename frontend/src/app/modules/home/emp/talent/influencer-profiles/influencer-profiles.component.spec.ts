import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerProfilesComponent } from './influencer-profiles.component';

describe('InfluencerProfilesComponent', () => {
  let component: InfluencerProfilesComponent;
  let fixture: ComponentFixture<InfluencerProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerProfilesComponent]
    });
    fixture = TestBed.createComponent(InfluencerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
