import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';

import { TopInfluencerCPEmodel } from 'src/app/core/interfaces/stats.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-top-influencers-by-cpe',
  templateUrl: './top-influencers-by-cpe.component.html',
  styleUrls: ['./top-influencers-by-cpe.component.scss']
})
export class TopInfluencersByCPEComponent implements OnInit {
  displayedColumns: string[] = ['influencerName', 'CPE']; 
  dataSource: MatTableDataSource<TopInfluencerCPEmodel>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private statisticsService: StatisticsService) {
    this.dataSource =  new MatTableDataSource<TopInfluencerCPEmodel>([]); // Initialize with empty array
  }

  ngOnInit(): void {
    
    this.loadtopinfluencerbyCPE();
  }




  public loadtopinfluencerbyCPE() {
    this.statisticsService.gettopinfluencerbyCPE().subscribe((res: any) => {
      console.log("Received data:", res); // Log the received data
  
      // Check if the response status is "success" and the data field is an array
      if (res.status === 'success' && Array.isArray(res.data)) {
        this.dataSource = new MatTableDataSource<TopInfluencerCPEmodel>(res.data); // Update dataSource with received data
        this.dataSource.paginator = this.paginator; // Assign paginator to dataSource
      } else {
        console.error('Invalid data format received:', res);
        // Handle the case where the data format is not as expected
      }
    });
  }
}
