import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfluencersByCpmComponent } from './top-influencers-by-cpm.component';

describe('TopInfluencersByCpmComponent', () => {
  let component: TopInfluencersByCpmComponent;
  let fixture: ComponentFixture<TopInfluencersByCpmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopInfluencersByCpmComponent]
    });
    fixture = TestBed.createComponent(TopInfluencersByCpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
