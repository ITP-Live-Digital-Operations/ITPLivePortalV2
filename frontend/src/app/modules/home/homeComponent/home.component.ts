import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationComponent } from '../homeComponent/notification/notification.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MatSidenav } from '@angular/material/sidenav'; // Corrected import path for MatSidenav
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        width: '60px', 
      })),
      state('expanded', style({
        width: '240px',
      })),
      transition('collapsed <=> expanded', animate('0.2s ease-in-out')),
    ]),
    trigger('contentMargin', [
      state('collapsed', style({
        'margin-left': '60px', // The margin when the sidenav is collapsed
      })),
      state('expanded', style({
        'margin-left': '240px', // The margin when the sidenav is expanded
      })),
      transition('collapsed <=> expanded', animate('0.2s ease-in-out')),
    ]),
  ],
})

export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isOpen = false; // Track the state of the sidenav


  public path = PATH;

  public userName!: string;
  public userRole!: string;
  public privilegeLevel!: number;
  public onLeave : boolean = false;
  private user: any;

  public backButton: boolean = false;
  public sidenavOpened: boolean = true;

  public notificationCount: any;
  public userId = this.userService.getID();

  private routerSubscription!: Subscription;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService
  ) {

    this.userService.getUserByID(this.userId).subscribe((res) => {
      this.user = res;
      this.userName = res.name;
      this.userRole = this.user.role;
      this.privilegeLevel = this.user.privilege_level;
      this.onLeave = this.user.onLeave;
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

  mouseenter() {
    this.isOpen = true;
  }
  
  mouseleave() {
    this.isOpen = false;
  }
  public exportSeeds(): void {
    /* this.dataService.exportSeeds().subscribe((res) => {
      const msg: any = res;

      if (msg.message == 'Script executed successfully!') {
        this.toastrService.success('Seeds exported successfully!');
      } else {
        this.toastrService.error('Seeds export failed!');
      }
    }); */
  }

  ngOnChanges() {}

  goOnLeave() {
    this.dialogService
      .openConfirmationDialog(
        'Confirm!',
        'Are you sure you want to go on leave?',
        'yesno'
      )
      .subscribe((result) => {
        if (result == true) {
          this.userService.goOnLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are on leave now!');
            if (this.userId == 15) {
              this.userService.addTalentHead(24).subscribe((res) => {
                window.location.reload();
              });
            }else{
              window.location.reload();
            }
          });

        }
      });
  }

  returnFromLeave() {
    this.dialogService
      .openConfirmationDialog(
        'Confirm!',
        'Are you sure you want to return to work?',
        'yesno'
      )
      .subscribe((result) => {
        if (result == true) {
          this.userService.returnFromLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are back from leave!');

            if (this.userId == 15) {
              this.userService.removeTalentHead(24).subscribe((res) => {window.location.reload();});
            }else{
              window.location.reload();
            }
          });

        }
      });
  }
}
