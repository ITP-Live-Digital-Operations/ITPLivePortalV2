import { Component, OnInit, ViewChild } from '@angular/core';

import { PATH } from 'src/app/core/constant/routes.constants';


@Component({
  selector: 'app-topinfluencers',
  templateUrl: './topinfluencers.component.html',
  styleUrls: ['./topinfluencers.component.scss']
})
export class TopinfluencersComponent  {
  public path = PATH;
  constructor(
    
  ) { }

}
