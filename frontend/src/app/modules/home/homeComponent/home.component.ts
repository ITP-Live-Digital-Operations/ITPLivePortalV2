import { Component, HostListener } from '@angular/core';
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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SubmitSuggestionComponent } from '../sharing/submit-suggestion/submit-suggestion.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          width: '60px',
        })
      ),
      state(
        'expanded',
        style({
          width: '300px',
        })
      ),
      transition('collapsed <=> expanded', animate('0.2s ease-in-out')),
    ]),
    trigger('contentMargin', [
      state(
        'collapsed',
        style({
          'margin-left': '60px', // The margin when the sidenav is collapsed
        })
      ),
      state(
        'expanded',
        style({
          'margin-left': '300px', // The margin when the sidenav is expanded
        })
      ),
      transition('collapsed <=> expanded', animate('0.2s ease-in-out')),
    ]),
    trigger('slideUpDown', [
      state(
        'collapsed',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class HomeComponent {
  themeClass: string = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  isOpen = false;

  private touchStartX = 0;
  private touchEndX = 0;
  public path = PATH;

  public userName!: string;
  public userRole!: string;
  public privilegeLevel!: number;
  public onLeave: boolean = false;
  public backtowork: boolean = false;
  private user: any;

  public backButton: boolean = false;
  public sidenavOpened: boolean = false;

  public notificationCount: any;
  public userId = this.userService.getID();

  private routerSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void {
    this.updateViewState(this.router.url);

    // Subscribe to router events to update state upon navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.updateViewState((event as NavigationEnd).url));

    const url = this.router.url;
    if (url.endsWith('/forms')) {
      this.themeClass = 'content-noScroll';
    } else {
      this.themeClass = '';
    }

    this.userService.getUserByID(this.userId).subscribe((res) => {
      this.user = res;
      this.userName = res.name;
      this.userRole = this.user.role;
      this.privilegeLevel = this.user.privilege_level;
      this.onLeave = this.user.onLeave;
      this.notificationService
        .getUnreadNotificationCountByUserId(this.userId)
        .subscribe((res) => {
          this.notificationCount = res;
        });
    });

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const url = event.url;

        // Define an array of URL patterns where the back button should not appear
        const noBackButtonPatterns = [
          /^\/forms$/,
          /^\/main$/,
          /^\/talent$/,
          /^\/sales$/,
          /^\/home$/,
         /^\/home\/main\/influencer\/\d+$/,  // Matches /influencer/ followed by any number
        ];

        // Check if the current URL matches any of the patterns
        const shouldHideBackButton = noBackButtonPatterns.some(pattern => pattern.test(url));

        if (shouldHideBackButton) {

          this.backButton = false;
          this.themeClass = url.endsWith('/forms') ? 'content-noScroll' : '';
        } else {
          this.backButton = true;
          this.themeClass = '';
        }
        if (url.match(/^\/home\/main\/influencer\/\d+$/)) {
          this.backButton = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  private updateViewState(url: string): void {
    const noBackButtonRoutes = ['/forms', '/main', '/talent', '/sales', '/home'];
    this.backButton = !noBackButtonRoutes.some(route => url.endsWith(route));
    this.themeClass = url.endsWith('/forms') ? 'content-noScroll' : '';
  }

  public toggleNotificationBox(): void {
    this.dialog.open(NotificationComponent, {
      width: '680px',
      height: '600px',
      data: {
        userId: this.userId,
      },
      position: {
        top: '11.5%',
        left: '3.1%',
      },
    });
  }
  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const minSwipeDistance = 50; // Minimum distance in pixels to consider as swipe
    const direction = this.touchEndX - this.touchStartX;

    if (Math.abs(direction) >= minSwipeDistance) {
      if (direction > 0) {
        // Swipe right
        this.sidenavOpened = true;
      } else {
        // Swipe left
        this.sidenavOpened = false;
      }
      // Toggle the sidebar's opened state
      this.sidenav.opened = this.sidenavOpened;
    }
  }

  mouseenter() {
    this.isOpen = true;
  }

  mouseleave() {
    this.isOpen = false;
  }

  ngOnChanges() {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
  goOnLeave() {
    this.dialogService
      .openConfirmationDialog(
        'Confirm!',
        'Are you sure you want to go on leave?',
        'yesno'
      )
      .subscribe((result) => {
        if (result == true) {
          this.onLeave = true;
          this.backtowork = false;
          this.userService.goOnLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are on leave now!');
            if (this.userId == 15) {
              this.userService.addTalentHead(24).subscribe((res) => {
                window.location.reload();
              });
            } else {
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
          this.onLeave = false;
          this.backtowork = true;
          this.userService.returnFromLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are back from leave!');

            if (this.userId == 15) {
              this.userService.removeTalentHead(24).subscribe((res) => {
                window.location.reload();
              });
            } else {
              window.location.reload();
            }
          });
        }
      });
  }

  submitSuggestion() {
    this.dialog.open(SubmitSuggestionComponent, {
      width: '100vh',
      height: '70vh',
      data: {
        userId: this.userId,
      },
    });

  }

}
