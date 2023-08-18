import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-person-tasks',
  templateUrl: './person-tasks.component.html',
  styleUrls: ['./person-tasks.component.scss'],
})
export class PersonTasksComponent {

  public path = PATH;
  briefDetails: any;
  dataSource: any;
  userID: any;
  id: any;

  privilegeLevel!: number;

  displayedColumns: string[] = [
    'deadline',
    'status',
    'weight',
    'createdAt',
    'progress',
    'priority',
    'Action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesService: SalesService,
    private route: Router,
    private taskService: TaskService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.privilegeLevel = this.userService.getPrivilegeLevel();
  }

  ngOnInit(): void {
    if (this.privilegeLevel < 7) {
      this.userID = this.userService.getID();
      this.getMyTasks(this.userID);
    } else {
      this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];

        this.taskService.getMyTasks(this.id).subscribe((data: any) => {
          this.dataSource = data.data;
        });
      });
    }
  }

  getMyTasks(id: any) {
    this.taskService.getMyTasks(id).subscribe((data: any) => {
      this.briefDetails = data;
      this.dataSource = new MatTableDataSource(this.briefDetails.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  viewedTask(id: any) {
    if (this.privilegeLevel < 7) {
      this.taskService
        .updateStatus({ assigned_to: this.userID, id: id })
        .subscribe((data: any) => {});
    }

    this.salesService.getSalesBriefIdbyTaskId(id).subscribe((data: any) => {
      this.route.navigate([`${this.path['viewBrief'] + data.data.brief_id}`]);
    });
  }
}
