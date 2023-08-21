import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FileService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';

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

  public path = PATH;
  private salespersonId: any;
  public assignForm!: FormGroup;

  displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Action'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { 
    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
      Deadline: ['', Validators.required]
    });

    this.getTalentTaskWeights()
  }

  public assign(id: number): void {
    if (this.assignForm.valid) {
      this.taskService
        .createTask({
          assigned_by: this.userService.getID(),
          assigned_to: id,
          brief_id: this.brief.data.id,
          weight: this.assignForm.value.Weight,
          deadline: this.assignForm.value.Deadline,
        })
        .subscribe((data: any) => {
          this.toastrService.success('Task Assigned!');
        });
      let input1 = {
        message: 'Sales Brief has been assigned ',
        link: `${this.path['sentBriefs'] + this.brief.data.id}`,
      };
      this.notificationService
        .createNotification(this.salespersonId, input1)
        .subscribe((data: any) => {});

      let input2 = {
        message: 'A task has been assigned to you. ',
        link: `${this.path['viewBrief'] + this.brief.data.id}`,
      };
      this.notificationService
        .createNotification(id, input2)
        .subscribe((data: any) => {});

      this.salesService
        .updateAssignedStatus(this.brief.data.id)
        .subscribe((data: any) => {
          this.toastrService.success('Brief Assigned');
          window.location.reload();
        });
    }
  }

  private getTalentTaskWeights(): void {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks;
    });
  }
}
