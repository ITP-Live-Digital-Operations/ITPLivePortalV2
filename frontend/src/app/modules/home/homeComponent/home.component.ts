import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationComponent } from '../homeComponent/notification/notification.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public path = PATH;

  userName: string = '';
  userRole: string = '';
  userPrivilege_level: number = 0;
  user: any;

  backButton: boolean = false;

  sidenavOpened: boolean = true;

  notifications$: any;
  notificationCount: any;
  userId = this.userService.getID();

  showNotificationBox: boolean = false;

  private routerSubscription!: Subscription;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {

    this.userService.getUserByID(this.userId).subscribe((res) => {
      this.user = res;
      this.userName = res.name;
      this.userRole = this.user.role;
      this.userPrivilege_level = this.user.privilege_level;

      this.notificationService.getUnreadNotificationCountByUserId(this.userId).subscribe((res) => {
        this.notificationCount = res;
      });
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event.url.endsWith('/forms')) {
        this.backButton = false;
      }else if (event.url.endsWith('/main')) {
        this.backButton = false;
      }
      else if (event.url.endsWith('/talent')) {
        this.backButton = false;
      }
      else if (event.url.endsWith('/sales')) {
        this.backButton = false;
      }
      else if (event.url.endsWith('/home')) {
        this.backButton = false;
      }
      else {
        this.backButton = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleNotificationBox() {
    this.dialog.open(NotificationComponent, {
      width: '500px',
      height: '500px',
      data: {
        userId: this.userId,
      },
    });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
