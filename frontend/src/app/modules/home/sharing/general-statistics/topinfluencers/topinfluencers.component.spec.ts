import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopinfluencersComponent } from './topinfluencers.component';

describe('TopinfluencersComponent', () => {
  let component: TopinfluencersComponent;
  let fixture: ComponentFixture<TopinfluencersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopinfluencersComponent]
    });
    fixture = TestBed.createComponent(TopinfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
