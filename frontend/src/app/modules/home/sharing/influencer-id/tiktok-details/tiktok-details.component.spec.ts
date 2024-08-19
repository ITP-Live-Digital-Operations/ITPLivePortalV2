import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiktokDetailsComponent } from './tiktok-details.component';

describe('TiktokDetailsComponent', () => {
  let component: TiktokDetailsComponent;
  let fixture: ComponentFixture<TiktokDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiktokDetailsComponent]
    });
    fixture = TestBed.createComponent(TiktokDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
