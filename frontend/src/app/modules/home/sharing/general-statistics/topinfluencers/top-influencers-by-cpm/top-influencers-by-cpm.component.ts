import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';

import { TopInfluencerCPMmodel } from 'src/app/core/interfaces/stats.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InfluencerIdComponent } from '../../../influencer-id/influencer-id.component';

@Component({
  selector: 'app-top-influencers-by-cpm',
  templateUrl: './top-influencers-by-cpm.component.html',
  styleUrls: ['./top-influencers-by-cpm.component.scss']
})
export class TopInfluencersByCpmComponent implements OnInit {
  displayedColumns1: string[] = ['influencerName', 'CPM'];
  dataSource1: MatTableDataSource<TopInfluencerCPMmodel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private statisticsService: StatisticsService,
              private dialog : MatDialog
  ) {
    this.dataSource1 =  new MatTableDataSource<TopInfluencerCPMmodel>([]); // Initialize with empty array
  }

  ngOnInit(): void {

    this.loadtopinfluencerbyCPM();
  }

  public loadtopinfluencerbyCPM() {
    this.statisticsService.getTopInfluencerbyCPM().subscribe((res: any) => {
      console.log("Received data:", res); // Log the received data

      // Check if the response status is "success" and the data field is an array
      if (res.status === 'success' && Array.isArray(res.data)) {
        this.dataSource1 = new MatTableDataSource<TopInfluencerCPMmodel>(res.data); // Update dataSource with received data
        this.dataSource1.paginator = this.paginator; // Assign paginator to dataSource
      } else {
        console.error('Invalid data format received:', res);
        // Handle the case where the data format is not as expected
      }
    });
  }

  viewInfuencer(influencerId: number) {
    console.log(influencerId)
    this.dialog.open( InfluencerIdComponent, {
      width: '100%',
      height: '95%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: influencerId,
      },
    });
  }
}
