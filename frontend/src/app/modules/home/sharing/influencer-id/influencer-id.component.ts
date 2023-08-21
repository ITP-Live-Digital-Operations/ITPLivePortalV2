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

  public id: number = this.source.id;
  public influencerData: any;
  public influencerRating: any;
  public dataSource: any;
  public UserDetails: any;
  public isReviewVisible: boolean = true;

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

  private GetInfluencerData(inputdata: any): void {
    this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
    });
  }

  private GetInfluencerRating(inputdata: any): void {
    this.service.getAverageInfluencerRating(inputdata).subscribe((item) => {
      this.influencerRating = item;
      });
  }

  private GetLogs(id: number): void {
    this.logService.getInfluencerLogs(id).subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<LogModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
