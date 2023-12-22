import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateCampaignComponent } from './initiate-campaign.component';

describe('InitiateCampaignComponent', () => {
  let component: InitiateCampaignComponent;
  let fixture: ComponentFixture<InitiateCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitiateCampaignComponent]
    });
    fixture = TestBed.createComponent(InitiateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
