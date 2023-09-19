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
  private briefDetails: any;
  public dataSource: any;
  private userID: any;
  private id: any;
  private privilegeLevel!: number;

  displayedColumns: string[] = [
    'deadline',
    'progress',
    'weight',
    'createdAt',
    'deadline',
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
          console.log("my tasks:");
          console.log(data);
          this.dataSource = data.data?.assignedUsers;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
  }

  private getMyTasks(id: any): void {
    this.taskService.getMyTasks(id).subscribe((data: any) => {
      this.briefDetails = data;
      this.dataSource = new MatTableDataSource(this.briefDetails.data?.assignedUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public viewedTask(id: any): void {
    if (this.privilegeLevel < 7) {
      this.taskService
        .updateStatus({ id: id })
        .subscribe((data: any) => {});
    }

    this.salesService.getSalesBriefIdbyTaskId(id).subscribe((data: any) => {
      this.route.navigate([`${this.path['viewBrief'] + data.data.brief_id}`]);
    });
  }
}
