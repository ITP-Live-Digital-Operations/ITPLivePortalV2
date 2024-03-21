import { Component, Input } from '@angular/core';
import { PATH } from 'src/app/core/constant/routes.constants';
import { CelebrityRemark } from 'src/app/core/interfaces/celebrity.model';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { UserService } from 'src/app/core/services/user.service';
import { CelebrityIdComponent } from '../celebrity-id.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { EditCelebrityRemarkComponent } from './edit-celebrity-remark/edit-celebrity-remark.component';
import { AddCelebrityRemarkComponent } from './add-celebrity-remark/add-celebrity-remark.component';

@Component({
  selector: 'app-celebrity-remarks',
  templateUrl: './celebrity-remarks.component.html',
  styleUrls: ['./celebrity-remarks.component.scss']
})
export class CelebrityRemarksComponent {

  @Input()
  profileData!: any;

  path = PATH;

  userId: number = this.userService.getID();

  remarks: CelebrityRemark[] = [];

  constructor(
    private userService: UserService,
    private celebrityService: CelebrityService,
    private router: Router,
    private dialogRef: MatDialogRef<CelebrityIdComponent>,
    private dialog: MatDialog,
    private confirmService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void {

    this.getCelebrityRemarks(this.profileData.data.id);
  }

  public getCelebrityRemarks(celebrityId: number){
    this.celebrityService.getCelebrityRemarks(celebrityId).subscribe((data) => {
      this.remarks = data;
    });
  }

  public addNewRemark(celebrityId: number, celebrityName: string){
    this.dialog.open(AddCelebrityRemarkComponent, {
      width: '600px',
      height: '350px',
      data: {id : celebrityId, name: celebrityName}
      }).afterClosed().subscribe(() => {
        this.getCelebrityRemarks(celebrityId);
      });
  }

  public editRemark(remarkId: number){
    this.dialog.open(EditCelebrityRemarkComponent, {
      width: '600px',
      height: '350px',
      data: {id : remarkId }
      }).afterClosed().subscribe(() => {
        this.getCelebrityRemarks(this.profileData.data.id);
      });
  }

  public deleteRemark(remarkId: number){
    this.confirmService
    .openConfirmationDialog('Confirm Dialog', 'Are you sure you want to delete this remark?')
    .subscribe((result) => {
      if (result) {
        this.celebrityService.deleteCelebrityRemark(remarkId).subscribe((data) => {
          if( data.status === 'success'){
            this.getCelebrityRemarks(this.profileData.data.id);
        }
        });
      }
    });
  }

}
