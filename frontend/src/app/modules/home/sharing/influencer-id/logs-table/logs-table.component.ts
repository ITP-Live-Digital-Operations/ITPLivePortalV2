import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerIdComponent } from '../influencer-id.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss'],
})
export class LogsTableComponent {
  @Input() id: number = 0;
  @Input() dataSource: any;
  @Input() UserDetails: any;
  @Input() profileData: any;

  constructor(private router: Router, private dialogRef: MatDialogRef<InfluencerIdComponent>) {}

  redirectToNewLog(id: any, name: any) {
    const data = { id: id, name: name };

    sessionStorage.setItem('influencerData', JSON.stringify(data));
    this.dialogRef.close();
    this.router.navigate(['home/talent/new/rateLog']);
  }

  displayedColumns: string[] = [
    'Influencer',
    'Campaign',
    'Platform',
    'Deliverable',
    'Currency',
    'Rate',
    'Contact',
    'Time_to_reply',
    'Date',
  ];
}
