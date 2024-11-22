import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverlayComponentComponent } from './loading-overlay-component.component';

describe('LoadingOverlayComponentComponent', () => {
  let component: LoadingOverlayComponentComponent;
  let fixture: ComponentFixture<LoadingOverlayComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverlayComponentComponent]
    });
    fixture = TestBed.createComponent(LoadingOverlayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
