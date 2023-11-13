import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClientCallsTableComponent } from './task-client-calls-table.component';

describe('TaskClientCallsTableComponent', () => {
  let component: TaskClientCallsTableComponent;
  let fixture: ComponentFixture<TaskClientCallsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskClientCallsTableComponent]
    });
    fixture = TestBed.createComponent(TaskClientCallsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
