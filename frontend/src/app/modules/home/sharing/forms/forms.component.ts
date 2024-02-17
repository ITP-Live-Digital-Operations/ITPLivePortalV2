import { Component,ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  public path = PATH;
  public privilegeLevel!: number;
  public userRole!: string;

  constructor(private userService: UserService){ }
 
  ngOnInit(){
    this.getRole();
    this.getPrivilegeLevel();
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
}
