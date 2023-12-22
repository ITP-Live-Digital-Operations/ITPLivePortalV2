import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFilesComponent } from './campaign-files.component';

describe('CampaignFilesComponent', () => {
  let component: CampaignFilesComponent;
  let fixture: ComponentFixture<CampaignFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignFilesComponent]
    });
    fixture = TestBed.createComponent(CampaignFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
