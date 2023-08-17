import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FileService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';

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

  salespersonId: any;
  assignForm!: FormGroup;

  displayedColumns: string[] = ['id', 'name', 'totalWeight', 'Action'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private fileService: FileService,
    private formBuilder: FormBuilder
  ) { 
    this.assignForm = this.formBuilder.group({
      Weight: ['', Validators.required],
      Deadline: ['', Validators.required]
    });

    this.getTalentTaskWeights()
  }

  assign(id: any) {
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
          // alertify.success('Task Assigned');
        });
      let input1 = {
        message: 'Sales Brief has been assigned ',
        link: `/home/sales/sentBrief/${this.brief.data.id}`,
      };
      this.notificationService
        .createNotification(this.salespersonId, input1)
        .subscribe((data: any) => {});

      let input2 = {
        message: 'A task has been assigned to you. ',
        link: `/home/talent/viewBrief/${this.brief.data.id}`,
      };
      this.notificationService
        .createNotification(id, input2)
        .subscribe((data: any) => {});

      this.salesService
        .updateAssignedStatus(this.brief.data.id)
        .subscribe((data: any) => {
          // alertify.success('Brief Assigned');
          window.location.reload();
        });
    }
  }

  approve(id: number) {
    this.fileService.approveFile(id).subscribe((data: any) => {
      // alertify.success('File approved successfully');
      window.location.reload();
    });
  }

  getTalentTaskWeights() {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      this.dataSource = data.usersWithTasks;
    });
  }
}
