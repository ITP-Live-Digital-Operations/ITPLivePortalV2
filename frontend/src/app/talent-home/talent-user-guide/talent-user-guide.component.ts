import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-talent-user-guide',
  templateUrl: './talent-user-guide.component.html',
  styleUrls: ['./talent-user-guide.component.css']
})
export class TalentUserGuideComponent implements OnInit {

  userRole = this.userService.getRole();
  userPl = this.userService.getPrivilegeLevel();
  
  ngOnInit(): void {

  }

  constructor(private userService : UserService) { }
}
