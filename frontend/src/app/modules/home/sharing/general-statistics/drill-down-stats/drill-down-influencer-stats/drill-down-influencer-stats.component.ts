import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-drill-down-influencer-stats',
  templateUrl: './drill-down-influencer-stats.component.html',
  styleUrls: ['./drill-down-influencer-stats.component.scss']
})
export class DrillDownInfluencerStatsComponent {

  campaignId: any;
  public dataSource: any;
  private influencerCampaignMetrics : any;
  displayedColumns: string[] = [
    'influencerName',
    'CPE',
    'CPM',
    'marginOfProfit',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private statisticsService: StatisticsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.loadInfluencerCampaignMetrics();
  }

  ngOnChanges(): void {
    this.loadInfluencerCampaignMetrics();
  }

  public loadInfluencerCampaignMetrics() {
    this.statisticsService.getInfluencerCampaignMetricsByCampaignId(this.campaignId).subscribe((res) => {
      this.influencerCampaignMetrics = res;
      this.dataSource = new MatTableDataSource<any[]>(
        this.influencerCampaignMetrics
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
