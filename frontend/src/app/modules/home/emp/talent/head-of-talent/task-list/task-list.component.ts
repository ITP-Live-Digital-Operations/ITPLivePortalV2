import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  dataSource: any;

  displayedColumns: string[] = ['name', 'totalWeight', 'action'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTalentTaskWeights();
  }

  getTalentTaskWeights() {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks;
    });
  }
}
