import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramDetailsComponent } from './instagram-details.component';

describe('InstagramDetailsComponent', () => {
  let component: InstagramDetailsComponent;
  let fixture: ComponentFixture<InstagramDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstagramDetailsComponent]
    });
    fixture = TestBed.createComponent(InstagramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
