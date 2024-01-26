import { Component } from '@angular/core';
import { PATH } from 'src/app/core/constant/routes.constants';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss']
})
export class GeneralStatisticsComponent {
  public path = PATH;
  constructor(
    
  ) { }

}
