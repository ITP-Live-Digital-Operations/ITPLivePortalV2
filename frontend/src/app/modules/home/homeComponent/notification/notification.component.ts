import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notifications: any;

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  user: any;
  userName: string = '';
  userPrivilege_level: number = 0;

  onClose() {
    this.dialogRef.close();
  }

  userId = this.userService.getID();
  userRole = this.userService.getRole();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialogRef: DialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public source: any
  ) {
    this.notificationService
      .getNotificationsByUserId(this.source.userId)
      .subscribe((res) => {
        console.log(res);
        this.notifications = res;
      });

    this.userService.getUserByID(this.userId).subscribe((res) => {
      this.user = res;
      this.userName = this.user.userName;
      this.userRole = this.user.role;
      this.userPrivilege_level = this.user.privilege_level;
    });
  }

  updateNotificationStatus(notificationId: any) {
    this.notificationService
      .updateNotificationStatus(notificationId)
      .subscribe((res) => {});
  }

  timeSince(created_at: string | Date) {
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
}
