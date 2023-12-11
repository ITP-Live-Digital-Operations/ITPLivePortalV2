import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignComponent } from './edit-campaign.component';

describe('NewCampaignComponent', () => {
  let component: EditCampaignComponent;
  let fixture: ComponentFixture<EditCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCampaignComponent]
    });
    fixture = TestBed.createComponent(EditCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
