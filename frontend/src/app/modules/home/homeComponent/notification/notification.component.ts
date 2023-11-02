import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  public notifications: any;



  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private notificationService: NotificationService,
    private dialogRef: DialogRef<NotificationComponent>,
    private dialogService: ConfirmationDialogService,

    @Inject(MAT_DIALOG_DATA) public source: any
  ) {
    this.notificationService
      .getNotificationsByUserId(this.source.userId)
      .subscribe((res) => {
        this.notifications = res;
      });
  }

  public onClose() : void{
    this.dialogRef.close();
  }

  public updateNotificationStatus(notificationId: number): void {
    this.notificationService
      .updateNotificationStatus(notificationId)
      .subscribe((res) => {});
  }

  public timeSince(created_at: string | Date): string {
    let date: Date;

    if (typeof created_at === 'string') {
      date = new Date(created_at);
    } else {
      date = created_at;
    }
    date.setHours(date.getHours());
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  public markAllAsRead(): void {}

  clear(): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to clear all notifications?')
    .subscribe(result => {
      if (result === true) {
        this.notificationService.clearAllNotificationsById(this.source.userId).subscribe((res) => {
          this.notifications = [];
        });

      }
    });
  }
}
