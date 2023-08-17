import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-talent-guide',
  templateUrl: './talent-guide.component.html',
  styleUrls: ['./talent-guide.component.scss']
})
export class TalentGuideComponent {

  constructor(private userService: UserService){}
  
  userRole = this.userService.getRole();
  userPl = this.userService.getPrivilegeLevel();

}
