import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { TopInfluencerMarginmodel } from 'src/app/core/interfaces/stats.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InfluencerIdComponent } from '../../../influencer-id/influencer-id.component';

@Component({
  selector: 'app-top-influencers-by-margin-profit',
  templateUrl: './top-influencers-by-margin-profit.component.html',
  styleUrls: ['./top-influencers-by-margin-profit.component.scss']
})
export class TopInfluencersByMarginProfitComponent implements OnInit {
  displayedColumns: string[] = ['influencerName', 'marginOfProfit']; // Corrected column name
  dataSource: MatTableDataSource<TopInfluencerMarginmodel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private statisticsService: StatisticsService, private dialog : MatDialog) {
    this.dataSource = new MatTableDataSource<TopInfluencerMarginmodel>([]); // Initialize with empty array
  }

  ngOnInit(): void {
    this.loadTopInfluencerByMarginProfit(); // Corrected method name
  }

  public loadTopInfluencerByMarginProfit() { // Corrected method name
    this.statisticsService.getTopInfluencersMarginOfProfit().subscribe((res: any) => {
      console.log("Received data:", res); // Log the received data

      // Check if the response status is "success" and the data field is an array
      if (res.status === 'success' && Array.isArray(res.data)) {
        this.dataSource = new MatTableDataSource<TopInfluencerMarginmodel>(res.data); // Update dataSource with received data
        this.dataSource.paginator = this.paginator; // Assign paginator to dataSource
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
