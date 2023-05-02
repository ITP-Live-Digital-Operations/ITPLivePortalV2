import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/Services/log.service';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { LogModel } from 'src/app/Models/LogModel';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
 
  dataSource: any;
  UserDetails: any;
  influencers: any;
  campaigns: any[] = []
  talentUserNames: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort !: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.extractColumnData()
  }

  extractColumnData(): void {
    const renderedData = this.table['_data'];

    for (let i = 0; i < renderedData.length; i++) {
      const row = renderedData[i];
      this.campaigns.push(row.Campaign);
    }
  }

  constructor(private service: LogService, private influencerService: InfluencerService, private route: Router, private userService : UserService) { }

  ngOnInit(): void {

    this.GetAllLogs();
    this.GetInfluencerNames();
    this.GetUserNames();
  }

  GetAllLogs() {
    this.service.getAllLogs().subscribe((item) => {

      this.UserDetails = item;
      this.dataSource = new MatTableDataSource<LogModel>(this.UserDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  GetInfluencerNames() {
    this.influencerService.getInfluencerNames().subscribe((item) => {


      this.influencers = item;
    })
  }

  GetUserNames() {
    this.userService. getTalentUserIdNames().subscribe((item) => {
      this.talentUserNames = item;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Influencer.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Campaign.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(filterValue: string) {
    if (!filterValue) {
      filterValue = '';
    }

    this.dataSource.filterPredicate = (data: LogModel, filter: string) => {
      return data.Campaign.trim().toLowerCase() === filter;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backButton() {
    window.history.back();
  }

  displayedColumns: string[] = ['Influencer', 'Campaign', 'Platform', 'Deliverable', 'Currency', 'Rate', 'Contact', 'Date'];

}
