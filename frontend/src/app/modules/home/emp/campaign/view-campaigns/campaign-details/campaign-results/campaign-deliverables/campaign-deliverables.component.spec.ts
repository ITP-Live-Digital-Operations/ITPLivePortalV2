import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDeliverablesComponent } from './campaign-deliverables.component';

describe('CampaignDeliverablesComponent', () => {
  let component: CampaignDeliverablesComponent;
  let fixture: ComponentFixture<CampaignDeliverablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignDeliverablesComponent]
    });
    fixture = TestBed.createComponent(CampaignDeliverablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
