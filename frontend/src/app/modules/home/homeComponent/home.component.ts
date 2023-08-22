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

  public userName!: string;
  public userRole!: string;
  public privilegeLevel!: number;
  private user: any;

  public backButton: boolean = false;
  public sidenavOpened: boolean = true;

  public notificationCount: any;
  public userId = this.userService.getID();

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
      this.privilegeLevel = this.user.privilege_level;

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

  public toggleNotificationBox(): void {
    this.dialog.open(NotificationComponent, {
      width: '500px',
      height: '500px',
      data: {
        userId: this.userId,
      },
      position: {
        top: '3%',
        right: '7%',
      },
    });
  }

  public toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
