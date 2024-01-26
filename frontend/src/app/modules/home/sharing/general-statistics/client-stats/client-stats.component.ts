import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent {

    public dataSource: any;
    private clientMetrics : any;
    displayedColumns: string[] = [
      'clientName',
      'clientCPE',
      'clientCPM',
      'itpCPE',
      'itpCPM',
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
      this.loadClientMetrics();
    }

    public loadClientMetrics() {
      this.statisticsService.getClientMetrics().subscribe((res) => {
        this.clientMetrics = res;
        this.dataSource = new MatTableDataSource<any[]>(
          this.clientMetrics
        );

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


    }
}
