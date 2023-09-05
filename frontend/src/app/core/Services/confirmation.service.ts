import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})

export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title, message },
      width: '400px',
      height: '300px',
    });

    return dialogRef.afterClosed();
  }
}