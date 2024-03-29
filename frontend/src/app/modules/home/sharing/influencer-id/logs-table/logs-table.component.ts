import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerIdComponent } from '../influencer-id.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PATH } from 'src/app/core/constant/routes.constants';
import { LogService } from 'src/app/core/services/log.service';
import { LogModel } from 'src/app/core/interfaces/logModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RateLogsComponent } from '../../../emp/talent/create/rate-logs/rate-logs.component';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss'],
})
export class LogsTableComponent {
  @Input()
  id: number = 0;

  @Input()
  profileData: any;

  @Input()
  users: any;

  logs: LogModel[] = [];
  log!: LogModel;

  single: boolean = false;
  package: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource: any;

  private path = PATH;

  displayedColumns: string[] = [
    'Campaign',
    'Contact',
    'Time_to_reply',
    'Date',
    'type',
    'Action',
  ];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<InfluencerIdComponent>,
    private logService: LogService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getLogs(this.id);
  }

  public redirectToNewLog(id: number, name: string): void {
    const data = { id: id, name: name };

    sessionStorage.setItem('influencerData', JSON.stringify(data));
    this.dialog.open(RateLogsComponent, {
      width: 'fit-to-content',
      height: 'fit-to-content',
    })
  }

  public getLogs(id: number): void {
    this.logService.getInfluencerLogs(id).subscribe((item) => {
      this.logs = item;

      this.dataSource = new MatTableDataSource<LogModel>(item);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public viewLog(id: number, type: string): void {
    this.single = false;
    this.package = false;

    this.log = this.logs[id];

    if (type == 'single') {
      this.single = true;
    }

    if (type == 'package') {
      this.package = true;
    }
  }

  public getUsername(id: number): string {
    return this.users[id];
  }

  public floor(value: number): number {
    return Math.floor(value);
  }
}
