import { Component, Input } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-campaign-results',
  templateUrl: './campaign-results.component.html',
  styleUrls: ['./campaign-results.component.scss']
})
export class CampaignResultsComponent {

  @Input()
  id !: number;

  protected displayedColumns: string[] = [
    'campaignName',
    'CPE',
    'CPM',
    'ER',
    'marginOfProfit',
  ];

  public dataSource: any[] = [];

  constructor(
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.getInfluencerCampaignStats();
  }


  getInfluencerCampaignStats(): void {
    this.statisticsService.getInfluencerCampaignMetricsByInfluencerId(this.id).subscribe((data: any) => {
      this.dataSource = data;
    });
  }

}
