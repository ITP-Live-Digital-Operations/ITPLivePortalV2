import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-campaign-stats',
  templateUrl: './campaign-stats.component.html',
  styleUrls: ['./campaign-stats.component.scss']
})
export class CampaignStatsComponent {

  

  public dataSource: any;
  private campaignMetrics : any;
  displayedColumns: string[] = [
    'campaignName',
    'CPE',
    'CPM',
    'marginOfProfit',
    'view',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.statisticsService.getCampaignMetrics().subscribe((res) => {
      console.log(res);
    });

    this.loadCampaignMetrics();
  }

  public loadCampaignMetrics() {
    this.statisticsService.getCampaignMetrics().subscribe((res) => {
      this.campaignMetrics = res;
      this.dataSource = new MatTableDataSource<any[]>(
        this.campaignMetrics
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

