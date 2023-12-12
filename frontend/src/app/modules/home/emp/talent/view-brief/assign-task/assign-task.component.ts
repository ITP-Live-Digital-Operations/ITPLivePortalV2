import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})
export class AssignTaskComponent {
  dataSource: any;
  protected talentHeads: any;

  @Input()
  brief!: any;

  @Input()
  brief_id: any;

  task: any;
  userId = this.userService.getID();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  protected path = PATH;
  private salespersonId = this.brief?.data.CreatedbyID;
  protected assignForm!: FormGroup;
  selectedIds: number[] = [];

  displayedColumns: string[] = ['name', 'totalWeight', 'Select'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    @Optional() private dialogRef: MatDialogRef<AssignTaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) protected source: any
  ) {
    this.getTalentTaskWeights();

    if (!source) {
      this.assignForm = this.formBuilder.group({
        Weight: ['', Validators.required],
        Deadline: [null],
      });
    } else {
      this.task = source.task;
      console.log(this.task);
      this.assignForm = this.formBuilder.group({
        Weight: [this.task.weight, Validators.required],
        Deadline: [this.task.deadline],
      });
    }
  }
  ngOnInit(): void {
    this.getTalentHeads();
  }

  protected assign(): void {
    if (this.assignForm.valid) {
      this.selectedIds = [];

      const briefId = this.brief.data.id;
      const weight = this.assignForm.value.Weight;
      const deadline = this.assignForm.value.Deadline;
      const assignedBy = this.userService.getID();

      console.log(deadline)

      for (const item of this?.dataSource) {
        if (item.selected.value) {
          this.selectedIds.push(item.id);
        }
      }
      this.taskService
        .createTask({
          assigned_by: assignedBy,
          brief_id: briefId,
          weight: weight,
          deadline: deadline,
        })
        .subscribe(
          (data: any) => {
            const newTaskId = data.data.id;

            for (let i = 0; i < this.selectedIds.length; i++) {
              this.taskService
                .addUserToTask(newTaskId, this.selectedIds[i])
                .subscribe(
                  (data: any) => {
                    this.notificationService
                      .createNotification(this.selectedIds[i], {
                        message: 'A task has been assigned to you!',
                        link: `${this.path['viewBrief'] + briefId}`,
                      })
                      .subscribe((data: any) => {});
                  },
                  (error) => {
                    console.error('Error:', error);
                  }
                );
            }
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
                window.location.reload();
              });
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }

  update(): void {
    if (this.assignForm.valid) {
      this.selectedIds = [];

      const weight = this.assignForm.value.Weight;
      const deadline = this.assignForm.value.Deadline;

      for (const item of this?.dataSource) {
        if (item.selected.value) {
          this.selectedIds.push(item.id);
        }
      }
      this.taskService
        .updateTask(this.task.id, { weight: weight, deadline: deadline })
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (error) => {
            console.error('Error:', error);
          }
        );

      this.taskService
        .updateUsersToTask(this.task.id, { userIds: this.selectedIds })
        .subscribe(
          (data: any) => {
            console.log(data);
            this.toastrService.success('Task Updated!');

            for (let i = 0; i < this.selectedIds.length; i++) {
              this.notificationService
                .createNotification(this.selectedIds[i], {
                  message: 'A task has been assigned to you!',
                  link: `${this.path['viewBrief'] + this.source.briefID}`,
                })
                .subscribe((data: any) => {});
            }
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }

  private getTalentTaskWeights(): void {
    this.taskService.getUsersAndTaskWeights().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.usersWithTasks
        .filter((user: any) => user.onLeave !== true)
        .map((user: any) => {
          user.selected = new FormControl(false);
          return user;
        });
      if (this.task != null) {
        for (let i = 0; i < this.task?.assignedUsers?.length; i++) {
          for (let j = 0; j < this.dataSource.length; j++) {
            if (this.dataSource[j].id == this.task.assignedUsers[i].id) {
              this.dataSource[j].selected = new FormControl(true);
            }
          }
        }
      }
    });
  }

  private getTalentHeads(): void {
    this.userService.getTalentHeads().subscribe((data: any) => {
      this.talentHeads = data;
      console.log(this.talentHeads);
    });
  }
}
