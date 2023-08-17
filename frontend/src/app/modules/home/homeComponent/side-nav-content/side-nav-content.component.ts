import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent {
  msg: any;

  pl: number = 0;
  userRole: string = '';

  @Input()
  userName!: string;
  
  @Input()
  userId!: number;

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userRole = this.userService.getRole();
    this.pl = this.userService.getPrivilegeLevel();
  }

  exportSeeds() {
    this.dataService.exportSeeds().subscribe((res) => {
      this.msg = res;

      if (this.msg.message == 'Script executed successfully!') {
        // alertify.success('Seeds exported successfully!');
      } else {
        // alertify.error('Seeds export failed!');
      }
    });
  }
}
