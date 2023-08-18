import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  public path = PATH;

  pl: number = 0;
  userRole: string = '';

  constructor(private userService: UserService, private router: Router){ }

  ngOnInit(){
    this.getRole();
    this.getPrivilegeLevel();
  }

  getRole(){
    this.userRole = this.userService.getRole();
  }

  getPrivilegeLevel(){
    var token = localStorage.getItem('token');
    if (token && token.startsWith("Bearer ")) {
      var jwt = token.substring(7);
      var parts = jwt.split('.');
      var payload = JSON.parse(atob(parts[1]));
      this.pl = payload.privilege_level;
    }
  }
}
