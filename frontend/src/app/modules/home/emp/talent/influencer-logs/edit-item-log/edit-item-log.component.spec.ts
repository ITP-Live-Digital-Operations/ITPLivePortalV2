import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemLogComponent } from './edit-item-log.component';

describe('EditItemLogComponent', () => {
  let component: EditItemLogComponent;
  let fixture: ComponentFixture<EditItemLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditItemLogComponent]
    });
    fixture = TestBed.createComponent(EditItemLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
