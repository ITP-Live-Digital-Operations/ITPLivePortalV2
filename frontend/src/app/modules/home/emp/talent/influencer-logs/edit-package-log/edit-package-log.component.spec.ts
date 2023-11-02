import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageLogComponent } from './edit-package-log.component';

describe('EditPackageLogComponent', () => {
  let component: EditPackageLogComponent;
  let fixture: ComponentFixture<EditPackageLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPackageLogComponent]
    });
    fixture = TestBed.createComponent(EditPackageLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
