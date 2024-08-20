import { Component,ElementRef, ViewChild  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { filter } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;
  currentView: 'main' | 'talent' | 'campaign' | 'originals' | 'sales' = 'main'
  public path = PATH;
  public privilegeLevel!: number;
  public userRole!: string;

  constructor(private userService: UserService,
    private router: Router
  ){ }

  ngOnInit(){
    this.getRole();
    this.getPrivilegeLevel();

    console.log('Current URL:', this.router.url);
    console.log('Current View:', this.currentView);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentView();
    });

  }
  changeView(view: 'main' | 'talent' | 'campaign' | 'sales'| 'sales') {
    this.currentView = view;
  }

  private getRole(): void {
    this.userRole = this.userService.getRole();
  }
  onWheel(event: WheelEvent): void {
    event.preventDefault(); // Prevent the default wheel behavior (scrolling).
    const container = this.carousel.nativeElement;
    const toScroll = event.deltaY < 0 ? -80 : 80; // Adjust this value to control the scroll amount

    // Smoothly scroll the container
    container.scrollBy({ left: toScroll, behavior: 'auto' });
  }
  private getPrivilegeLevel(): void {
    var token = localStorage.getItem('token');
    if (token && token.startsWith("Bearer ")) {
      var jwt = token.substring(7);
      var parts = jwt.split('.');
      var payload = JSON.parse(atob(parts[1]));
      this.privilegeLevel = payload.privilege_level;
    }
  }

  isInfluencerDetailPage(): boolean {
    const url = this.router.url;
    return url.match(/^\/home\/main\/influencer\/\d+$/) !== null;
  }

  shouldShowBackButton(): boolean {
    const isValidView = this.currentView === 'campaign' ||
                        this.currentView === 'talent' ||
                        this.currentView === 'sales';
    const isInfluencerDetailPage = this.isInfluencerDetailPage();
    console.log('Current URL:', this.router.url);
    console.log('Is Valid View:', isValidView);
    console.log('Is Influencer Detail Page:', isInfluencerDetailPage);
    return isValidView && !isInfluencerDetailPage;
  }

  private updateCurrentView() {
    const url = this.router.url;
    if (url.includes('/talent')) {
      this.currentView = 'talent';
    } else if (url.includes('/campaign')) {
      this.currentView = 'campaign';
    } else if (url.includes('/sales')) {
      this.currentView = 'sales';
    } else {
      this.currentView = 'main';
    }
  }
}
