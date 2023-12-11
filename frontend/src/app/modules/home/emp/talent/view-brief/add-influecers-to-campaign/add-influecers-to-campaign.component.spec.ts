import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfluecersToCampaignComponent } from './add-influecers-to-campaign.component';

describe('AddInfluecersToCampaignComponent', () => {
  let component: AddInfluecersToCampaignComponent;
  let fixture: ComponentFixture<AddInfluecersToCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInfluecersToCampaignComponent]
    });
    fixture = TestBed.createComponent(AddInfluecersToCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
