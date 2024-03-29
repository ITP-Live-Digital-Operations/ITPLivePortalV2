import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-logs',
  templateUrl: './rate-logs.component.html',
  styleUrls: ['./rate-logs.component.scss']
})
export class RateLogsComponent {
  constructor(
    private dialogRef: MatDialogRef<RateLogsComponent>
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
