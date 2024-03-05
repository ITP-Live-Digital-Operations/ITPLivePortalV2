import { Component } from '@angular/core';
import { PATH } from 'src/app/core/constant/routes.constants';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent {
  public path = PATH;
public userRole!: string;

  constructor(private userService : UserService){
    
  }

  ngOnInit(){
    this.getRole();
  }
  
  private getRole() : void{
    this.userRole = this.userService.getRole();
  }

}
