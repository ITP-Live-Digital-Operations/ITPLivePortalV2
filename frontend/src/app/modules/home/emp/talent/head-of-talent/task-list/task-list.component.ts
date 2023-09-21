import { Component, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {

  public path = PATH;
  public dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'totalWeight', 'onLeave', 'action'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTalentTaskWeights();
  }

  private getTalentTaskWeights(): void {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.usersWithTasks);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
