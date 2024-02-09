import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-drill-down-stats',
  templateUrl: './drill-down-stats.component.html',
  styleUrls: ['./drill-down-stats.component.scss']
})
export class DrillDownStatsComponent {


  clientId: any;
  public dataSource: any;
  private campaignMetrics : any;
  displayedColumns: string[] = [
    'campaignName',
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
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.loadCampaignMetrics();
  }

  ngOnChanges(): void {
    this.loadCampaignMetrics();
  }
  public loadCampaignMetrics() {
    this.statisticsService.getCampaignMetricsByClientId(this.clientId).subscribe((res) => {
      this.campaignMetrics = res;
      this.dataSource = new MatTableDataSource<any[]>(
        this.campaignMetrics
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
