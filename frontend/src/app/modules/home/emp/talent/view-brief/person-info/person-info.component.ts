import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { AddInfluecersToCampaignComponent } from '../add-influecers-to-campaign/add-influecers-to-campaign.component';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent {
  constructor(
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}
  @Input()
  assignedUser: any;

  @Input()
  salesperson: any;

  @Input()
  brief: any;

  @Input()
  task!: TaskModel;

  @Input()
  lastFeedback: any;

  campaignId!: number;

  ngOnChanges(): void {
    if (this.task != null) {
      if (this.task.deadline == null || this.task.deadline == undefined) {
        this.toastrService.warning(
          'Please set a deadline for the task!',
          'Set Deadline'
        );
      }
    }
  }

  addInfluencers() {
    this.campaignId = this.brief?.data?.campaignId;

    const dialogRef = this.dialog?.open(AddInfluecersToCampaignComponent, {
      width: '50%',
      height: '90%',
      data: {campaignId: this.campaignId},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
