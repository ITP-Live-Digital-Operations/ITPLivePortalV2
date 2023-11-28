import { Component, Input } from '@angular/core';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  @Input()
  profileData: any;

  protected displayedColumns: string[] = [
    'name',
    'platform',
    'deliverable',
    'followers',
    'reach',
    'impressions',
    'interactions',
    'clientCost',
    'influencerCost',
    'metric',
    'year',
  ];


  public dataSource: any[] = [];
  constructor(
    private influencerService: InfluencerService,
  ) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {

    this.influencerService.getInfluencerStatisticsById(this.profileData.data.id).subscribe((data: any) => {
      console.log(data.statData);
      this.dataSource = data.statData;
    });
  }
}
