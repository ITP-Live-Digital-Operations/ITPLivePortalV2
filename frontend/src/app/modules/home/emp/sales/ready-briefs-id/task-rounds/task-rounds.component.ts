import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/core/constant/routes.constants';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-rounds',
  templateUrl: './task-rounds.component.html',
  styleUrls: ['./task-rounds.component.scss'],
})
export class TaskRoundsComponent {
  @Input()
  task!: TaskModel;

  @Input()
  brief: any;

  path = PATH;

  feedbackForm: FormGroup;
  feedbackOptions: string[] = ['Accept', 'Request Changes'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService,
    private notificationService: NotificationService
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      let ids = this.task.assignedUsers.map((user: any) => user.id);

      this.taskService
        .roundFeedback(this.task.id, {
          feedback: this.feedbackForm.value.feedback,
          notes: this.feedbackForm.value.notes,
        })
        .subscribe((res: any) => {
          this.toastrService.success('Feedback submitted successfully');
        });
      if (this.feedbackForm.value.feedback === 'Accept') {
        let input = {
          message: `Brief ${this.brief.data.CampaignName} has been approved`,
          link: `${this.path['viewBrief']}${this.brief.data.id}`,
        };
        this.taskService
          .updateProgress(this.task.id, { progress: 'Submitted and Approved' })
          .subscribe((res: any) => {});
        for (let i = 0; i < ids.length; i++) {
          this.notificationService
            .createNotification(ids[i], input)
            .subscribe((res: any) => {});
        }
      } else if (this.feedbackForm.value.feedback === 'Request Changes') {
        let input = {
          message: `Brief ${this.brief.data.CampaignName} needs some changes`,
          link: `${this.path['viewBrief']}${this.brief.data.id}`,
        };
        for (let i = 0; i < ids.length; i++) {
          this.notificationService
            .createNotification(ids[i], input)
            .subscribe((res: any) => {});
        }
        this.taskService
          .updateProgress(this.task.id, { progress: 'Submitted and Rejected' })
          .subscribe((res: any) => {
            window.location.reload();
          });
      }
    }
  }
}
