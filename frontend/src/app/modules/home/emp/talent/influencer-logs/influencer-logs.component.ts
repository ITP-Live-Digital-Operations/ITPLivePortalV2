import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LogService } from 'src/app/core/services/log.service';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogModel } from 'src/app/core/interfaces/logModel';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfluencerIdComponent } from '../../../sharing/influencer-id/influencer-id.component';

@Component({
  selector: 'app-influencer-logs',
  templateUrl: './influencer-logs.component.html',
  styleUrls: ['./influencer-logs.component.scss'],
})
export class InfluencerLogsComponent {

  protected dataSource: any;
  protected UserDetails: any;
  protected influencers: any;
  protected campaigns: string[] = [];
  protected talentUserNames: any;
  protected userRole = this.userService.getRole();
  public path = PATH;


  single : boolean = false;
  package : boolean = false;

  logs : LogModel[] = [];
  log !: LogModel;

  users : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = [
    'Influencer',
    'Campaign',
    'Contact',
    'Time_to_reply',
    'Date',
    'type',
    'Action',
  ];

  constructor(
    private service: LogService,
    private influencerService: InfluencerService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private logService : LogService
  ) {}


  ngOnInit(): void {
    this.getAllLogs();
  }

  public getAllLogs(): void {
    this.service.getAllLogs().subscribe((data) => {
      console.log(data);
      this.logs = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public viewLog(id: number, type : string): void {
    this.single = false;
    this.package = false;


      this.log = this.logs[id];

      if(type == 'single'){
        this.single = true;
      }

      if(type == 'package'){
        this.package = true;
      }

  }

  public getUsername(id: number): string {
    return this.users[id];
}

public redirectToNewLog(): void {

  this.router.navigate([this.path['newRateLog']]);
}
}
