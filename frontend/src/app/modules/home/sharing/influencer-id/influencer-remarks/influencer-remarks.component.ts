import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PATH } from 'src/app/core/constant/routes.constants';
import { influencerRemark } from 'src/app/core/interfaces/influencersModel';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { InfluencerIdComponent } from '../influencer-id.component';
import { EditInfluencerRemarksComponent } from './edit-influencer-remarks/edit-influencer-remarks.component';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { NoteLogComponent } from '../../../emp/talent/create/rate-logs/note-log/note-log.component';

@Component({
  selector: 'app-influencer-remarks',
  templateUrl: './influencer-remarks.component.html',
  styleUrls: ['./influencer-remarks.component.scss']
})
export class InfluencerRemarksComponent {
  @Input()
  id!: number;

  @Input()
  profileData: any;

  path = PATH;

  userId: number = this.userService.getID();

  remarks: influencerRemark[] = [];
  constructor(
    private influencerService: InfluencerService,
    private router: Router,
    private dialogRef: MatDialogRef<InfluencerIdComponent>,
    private dialog: MatDialog,
    private userService: UserService,
    private confirmService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.influencerService.getInfluencerRemarks(this.id).subscribe((item) => {
      this.remarks = item;
    });
  }

  public redirectToNewRemark(id: number, name: string): void {
    const data = { id: id, name: name };

    sessionStorage.setItem('influencerData', JSON.stringify(data));
    this.dialog.open(NoteLogComponent, {
      width: '600px',
      data: { id: id, name: name },
    }).afterClosed().subscribe(() => {
      this.influencerService.getInfluencerRemarks(this.id).subscribe((item) => {
        this.remarks = item;
      });
    });

  }

  public editRemark(remarkId: number) {
    this.dialog.open(EditInfluencerRemarksComponent, {
      width: '600px',
      data: { id: remarkId },
    }).afterClosed().subscribe(() => {
      this.influencerService.getInfluencerRemarks(this.id).subscribe((item) => {
        this.remarks = item;
      })
    });

  }

  deleteRemark(remarkId: number) {
    this.confirmService
      .openConfirmationDialog('Confirm Dialog', 'Are you sure you want to delete this remark?')
      .subscribe((result) => {
        if (result) {
          this.influencerService.deleteInfluencerRemark(remarkId).subscribe((item) => {
            if (item.status === 'success') {
              this.influencerService.getInfluencerRemarks(this.id).subscribe((item) => {
                this.remarks = item;
              });
            }
          });
        }
      });

  }
}
