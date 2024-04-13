import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PATH } from 'src/app/core/constant/routes.constants';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent {
    public isLoading = true;
    public path = PATH;
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

    @ViewChild(MatTable) table!: MatTable<any>;
    private _sort: MatSort | null = null;

    @ViewChild(MatSort) set sort(sort: MatSort) {
      this._sort = sort;
      if (this.dataSource) {
        this.dataSource.sort = sort;
      }
    }
    
    ngAfterViewInit(): void {
      this.dataSource = new MatTableDataSource(this.clientMetrics);
      if (this._sort) {
        this.dataSource.sort = this._sort;
      } else {
        console.error('Sort not available');
      }
    }
    constructor(
      private statisticsService: StatisticsService,
    ) { }

    ngOnInit(): void {
      this.loadClientMetrics();
    }
   
    public loadClientMetrics() {
      this.isLoading = true; 
      this.statisticsService.getClientMetrics().subscribe((res) => {
        this.clientMetrics = res;
        this.isLoading = false; 
        this.dataSource = new MatTableDataSource<any[]>(this.clientMetrics);
        this.initializeSortingAndPagination();
        this.dataSource.paginator = this.paginator;
      });
    }
    private initializeSortingAndPagination(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
}
