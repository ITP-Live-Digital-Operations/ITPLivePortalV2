import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerIdComponent } from '../influencer-id.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PATH } from 'src/app/core/constant/routes.constants';
import { LogService } from 'src/app/core/services/log.service';
import { logItem, LogModel, LogModelUpdated, logPackage } from 'src/app/core/interfaces/logModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RateLogsComponent } from '../../../emp/talent/create/rate-logs/rate-logs.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss'],
})
export class LogsTableComponent {
  @Input() logs: LogModelUpdated[] = [];

  logsById : number = 0;

  selectedLog: LogModelUpdated | null = null;

  constructor( private userService : UserService){}

  ngOnInit(): void {
    console.log(this.logs);
  }

  getUserById(user_id: number){
    this.userService.getUserByID(user_id).subscribe((data) => {
      console.log(data);
      return data.id;
    })
  }

  viewLogDetails(log: LogModelUpdated): void {
    this.selectedLog = log;
  }

  closeLogDetails(): void {
    this.selectedLog = null;
  }

  getLogItemsOrPackages(log: LogModelUpdated): (logItem | logPackage)[] {
    return log.type === 'single' ? log.logItems : log.packages;
  }

  isSingleType(log: LogModelUpdated): boolean {
    return log.type === 'single';
  }

  getTotalRate(log: LogModelUpdated): number {
    if (this.isSingleType(log) && log.logItems.length > 0) {
      return log.logItems[0].rate;
    } else if (log.rate !== undefined) {
      return log.rate;
    }
    return 0;
  }
  // New helper method to safely access the rate property
  getItemRate(item: logItem | logPackage): number | undefined {
    return 'rate' in item ? item.rate : undefined;
  }
}
