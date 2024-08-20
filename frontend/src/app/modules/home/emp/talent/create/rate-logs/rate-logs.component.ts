import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-logs',
  templateUrl: './rate-logs.component.html',
  styleUrls: ['./rate-logs.component.scss']
})
export class RateLogsComponent {
  influencerId: number;

  constructor(
    private dialogRef: MatDialogRef<RateLogsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { influencerId: number },
  ) {
    console.log("Dialog Data:" , dialogData.influencerId);
    this.influencerId = dialogData.influencerId;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
