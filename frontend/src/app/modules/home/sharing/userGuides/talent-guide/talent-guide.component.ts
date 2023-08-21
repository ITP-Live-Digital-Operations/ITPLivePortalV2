import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-talent-guide',
  templateUrl: './talent-guide.component.html',
  styleUrls: ['./talent-guide.component.scss']
})
export class TalentGuideComponent {

  public userPl = this.userService.getPrivilegeLevel();

  constructor(private userService: UserService){}

}
