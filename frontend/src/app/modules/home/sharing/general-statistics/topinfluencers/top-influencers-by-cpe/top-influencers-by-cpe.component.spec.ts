import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfluencersByCPEComponent } from './top-influencers-by-cpe.component';

describe('TopInfluencersByCPEComponent', () => {
  let component: TopInfluencersByCPEComponent;
  let fixture: ComponentFixture<TopInfluencersByCPEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopInfluencersByCPEComponent]
    });
    fixture = TestBed.createComponent(TopInfluencersByCPEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
