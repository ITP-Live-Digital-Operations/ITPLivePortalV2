import { Component, ViewChild, Inject } from '@angular/core';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogService } from 'src/app/core/services/log.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LogModel } from 'src/app/core/interfaces/logModel';

@Component({
  selector: 'app-influencer-id',
  templateUrl: './influencer-id.component.html',
  styleUrls: ['./influencer-id.component.scss'],
})
export class InfluencerIdComponent {

  id: number = this.source.id;
  influencerData: any;
  influencerRating: any;
  dataSource: any;
  UserDetails: any;
  isReviewVisible: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private service: InfluencerService,
    private logService: LogService,
    @Inject(MAT_DIALOG_DATA) public source: any,
  ) {}

  ngOnInit(): void {
      this.GetInfluencerData(this.source.id);
      this.GetLogs(this.source.id);
      this.GetInfluencerRating(this.source.id);
  }

  GetInfluencerData(inputdata: any) {
    return this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
    });
  }

  GetInfluencerRating(inputdata: any) {
    return this.service.getAverageInfluencerRating(inputdata).subscribe((item) => {
      this.influencerRating = item;
      });
  }

  GetLogs(id: any) {
    this.logService.getInfluencerLogs(id).subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<LogModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
