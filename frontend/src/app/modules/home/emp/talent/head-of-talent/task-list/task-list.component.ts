import { Component } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {

  public path = PATH;
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
