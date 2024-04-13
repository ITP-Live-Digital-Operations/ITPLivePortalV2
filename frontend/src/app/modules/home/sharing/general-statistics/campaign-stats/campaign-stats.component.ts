import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PATH } from 'src/app/core/constant/routes.constants';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-campaign-stats',
  templateUrl: './campaign-stats.component.html',
  styleUrls: ['./campaign-stats.component.scss']
})
export class CampaignStatsComponent {

  path = PATH;
  public isLoading = true;
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

  @ViewChild(MatTable) table!: MatTable<any>;
  private _sort: MatSort | null = null;

  @ViewChild(MatSort) set sort(sort: MatSort) {
    this._sort = sort;
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }

  constructor(
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.statisticsService.getCampaignMetrics().subscribe((res) => {
      console.log(res);
    });

    this.loadCampaignMetrics();
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } else {
      console.error('DataSource not initialized');
    }
  }
  

  public loadCampaignMetrics() {
    this.isLoading = true; 
    this.statisticsService.getCampaignMetrics().subscribe((res) => {
      this.campaignMetrics = res;
      this.isLoading = false; 
      this.dataSource = new MatTableDataSource<any[]>(
        this.campaignMetrics
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

