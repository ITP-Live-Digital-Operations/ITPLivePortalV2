import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})

export class AssignTaskComponent {

  @Input()
  dataSource: any;

  @Input()
  brief!: any;

  @Input()
  brief_id: any;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  protected path = PATH;
  private salespersonId = this.brief?.data.CreatedbyID;
  protected assignForm!: FormGroup;
  selectedIds: number[] = [];

  displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Select'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { 

    this.getTalentTaskWeights();

    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
      Deadline: ['', Validators.required],
    });

  }
  

  protected assign(): void {

    if (this.assignForm.valid) {

      this.selectedIds = [];

      const briefId = this.brief.data.id;
      const weight = this.assignForm.value.Weight;
      const deadline = this.assignForm.value.Deadline;
      const assignedBy = this.userService.getID();
      
      for (const item of this.dataSource) {
        if (item.selected.value) {
          this.selectedIds.push(item.id);
        }
      }

      const taskObservables = this.selectedIds.map((id: number) =>
        this.taskService.createTask({
          assigned_by: assignedBy,
          assigned_to: id,
          brief_id: briefId,
          weight: weight,
          deadline: deadline,
        })
      );

      const notificationObservables = this.selectedIds.map((id: number) =>
        this.notificationService.createNotification(id, {
          message: 'A task has been assigned to you!',
          link: `${this.path['viewBrief'] + briefId}`,
        })
      );

      forkJoin([...taskObservables, ...notificationObservables])
      .subscribe(
        (data: any) => {
          this.toastrService.success('Tasks Assigned!');
        },
        error => {
          console.error('Error:', error);
        }
      );

      //SALES PERSON NOTIFICATION SEND
      this.notificationService
        .createNotification(this.salespersonId, {
          message: 'Sales Brief has been assigned!',
          link: `${this.path['sentBriefs'] + briefId}`,
        })
        .subscribe((data: any) => {});

      //UPDATE STATUS TO ASSIGNED
      this.salesService
        .updateAssignedStatus(briefId)
        .subscribe((data: any) => {
          this.toastrService.success('Brief Assigned!');
          // window.location.reload();
        });
    }
  }

  private getTalentTaskWeights(): void {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks.map((user: any) => {
        user.selected = new FormControl(false);
        return user;
      });
    });
  }
}
