import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/Services/notification.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.css']
})
export class NotificationPopupComponent {

  notifications : any;

  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  onClose() {
    this.router.navigate([`/home/${this.userRole}/forms`]);
    this.dialogRef.close();
  }

  backButton() {
    window.history.back();
  }
  userId = this.userService.getID();
  userRole = this.userService.getRole();
  constructor(private userService : UserService,private notificationService : NotificationService, private router : Router, private dialogRef : DialogRef<NotificationPopupComponent>, @Inject(MAT_DIALOG_DATA) public source: any) {
        this.notificationService.getNotificationsByUserId(this.source.userId).subscribe((res) => {
          console.log(res);
          this.notifications = res;
        });
   }

   updateNotificationStatus(notificationId : any) {
    this.notificationService.updateNotificationStatus(notificationId).subscribe((res) => {})
    }


  timeSince(created_at: string | Date) {
    let date: Date;

  if (typeof created_at === 'string') {
    date = new Date(created_at);
  } else {
    date = created_at;
  }
    date.setHours(date.getHours() - 2);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

}
