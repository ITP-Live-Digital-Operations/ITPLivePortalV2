import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignsComponent } from './view-campaigns.component';

describe('ViewCampaignsComponent', () => {
  let component: ViewCampaignsComponent;
  let fixture: ComponentFixture<ViewCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCampaignsComponent]
    });
    fixture = TestBed.createComponent(ViewCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
