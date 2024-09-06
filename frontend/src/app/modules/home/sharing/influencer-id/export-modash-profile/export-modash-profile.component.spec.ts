import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportModashProfileComponent } from './export-modash-profile.component';

describe('ExportModashProfileComponent', () => {
  let component: ExportModashProfileComponent;
  let fixture: ComponentFixture<ExportModashProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportModashProfileComponent]
    });
    fixture = TestBed.createComponent(ExportModashProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
