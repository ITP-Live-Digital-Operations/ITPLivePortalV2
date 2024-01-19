import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignResultsComponent } from './campaign-results.component';

describe('CampaignResultsComponent', () => {
  let component: CampaignResultsComponent;
  let fixture: ComponentFixture<CampaignResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignResultsComponent]
    });
    fixture = TestBed.createComponent(CampaignResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
