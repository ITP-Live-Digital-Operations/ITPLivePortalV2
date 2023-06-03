import { ChangeDetectorRef, Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointObserver } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { SalesService } from '../core/Services/sales.service';
import { TaskService } from '../core/Services/task.service';
import { Location } from '@angular/common';
import { DataService } from '../core/Services/data.service';
import * as alertify from 'alertifyjs';
import { UserService } from '../core/Services/user.service';
import { UserModel } from '../Models/UserModel';
import { NotificationService } from '../core/Services/notification.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../partial/notification-popup/notification-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: any;
  userRole: any;
  userPrivilege_level: any;
  user : any ;

  msg: any;


  notifications$: any;
  notificationCount : any;
  userId = this.userService.getID();

  showNotificationBox: boolean = false;

  showModal = false;

  onModalClose() {
    this.showModal = false;
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router, private notificationService : NotificationService, public dialog: MatDialog,
     private taskService: TaskService, private location: Location,  private cdr: ChangeDetectorRef, private dataService : DataService, private userService : UserService) {
      this.userService.getUserByID(this.userId).subscribe((res) => {
        this.user = res;
        this.userName = this.user.name;
        this.userRole = this.user.role;
        this.userPrivilege_level = this.user.privilege_level;

        })
        this.notificationService.getUnreadNotificationCountByUserId(this.userId).subscribe((res) => {
              this.notificationCount = res;
        })
      }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {


  }


  toggleNotificationBox() {
   this.dialog.open(NotificationPopupComponent,{
      width: '500px',
      height: '500px',
      data: {
        userId: this.userId}
   })

  }








  redirectToTalentForms() {
    this.router.navigate(['home/talent/forms'])
  }

  redirectToSalesForms() {
    this.router.navigate(['home/sales/forms'])
  }

  refresh(): void {
    const refreshFlag = localStorage.getItem('refreshed');

      if (!refreshFlag) {
      localStorage.setItem('refreshed', 'true');
      this.location.go(this.location.path());
      window.location.reload();
    }
  }

  exportSeeds(){
      this.dataService.exportSeeds().subscribe((res) => {
        this.msg = res

        if( this.msg.message == 'Script executed successfully!'){
          alertify.success('Seeds exported successfully!');
        }
        else{
          alertify.error('Seeds export failed!');
        }
      })
  }
}




