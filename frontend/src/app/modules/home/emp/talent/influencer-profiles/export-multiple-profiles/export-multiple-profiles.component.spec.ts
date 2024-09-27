import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMultipleProfilesComponent } from './export-multiple-profiles.component';

describe('ExportMultipleProfilesComponent', () => {
  let component: ExportMultipleProfilesComponent;
  let fixture: ComponentFixture<ExportMultipleProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportMultipleProfilesComponent]
    });
    fixture = TestBed.createComponent(ExportMultipleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
