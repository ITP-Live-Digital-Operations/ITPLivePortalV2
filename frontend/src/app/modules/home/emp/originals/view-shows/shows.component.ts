import { Component } from '@angular/core';
import { PATH } from 'src/app/core/constant/routes.constants';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent {
  public path = PATH;

  constructor(){
    
  }

}
