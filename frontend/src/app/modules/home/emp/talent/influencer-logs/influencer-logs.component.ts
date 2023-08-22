import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/services/log.service';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogModel } from 'src/app/core/interfaces/logModel';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-influencer-logs',
  templateUrl: './influencer-logs.component.html',
  styleUrls: ['./influencer-logs.component.scss'],
})
export class InfluencerLogsComponent implements OnInit {

  protected dataSource: any;
  protected UserDetails: any;
  protected influencers: any;
  protected campaigns: string[] = [];
  protected talentUserNames: any;
  protected userRole = this.userService.getRole();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = [
    'Influencer',
    'Campaign',
    'Platform',
    'Deliverable',
    'Currency',
    'Rate',
    'Talent',
    'Date',
  ];

  constructor(
    private service: LogService,
    private influencerService: InfluencerService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngAfterViewInit() {
    this.extractColumnData();
  }

  ngOnInit(): void {
    this.GetAllLogs();
    this.GetInfluencerNames();
    this.GetUserNames();
    if (this.userRole == 'superadmin') {
      this.displayedColumns.push('Action');
    }
  }

  private extractColumnData(): void {
    const renderedData = this.table['_data'];

    for (let i = 0; i < renderedData?.length; i++) {
      const row = renderedData[i];
      this.campaigns.push(row.Campaign);
    }
  }

  private GetAllLogs(): void {
    this.service.getAllLogs().subscribe((item) => {
      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<LogModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private GetInfluencerNames(): void {
    this.influencerService.getInfluencerNames().subscribe((item) => {
      this.influencers = item;
    });
  }

  private GetUserNames(): void {
    this.userService.getTalentUserIdNames().subscribe((item) => {
      this.talentUserNames = item;
    });
  }

  protected applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected applyFilter1(filterValue: string): void {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Influencer.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected applyFilter2(filterValue: string): void {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Campaign.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected applyFilter3(filterValue: string): void {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Campaign.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected deleteLog(id: any): void {
    this.service.deleteLog(id).subscribe((item) => {
      this.GetAllLogs();
      this.toastrService.success('Log Deleted.')
    });
  }
}
