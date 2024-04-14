import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfluencersByMarginProfitComponent } from './top-influencers-by-margin-profit.component';

describe('TopInfluencersByMarginProfitComponent', () => {
  let component: TopInfluencersByMarginProfitComponent;
  let fixture: ComponentFixture<TopInfluencersByMarginProfitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopInfluencersByMarginProfitComponent]
    });
    fixture = TestBed.createComponent(TopInfluencersByMarginProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
