import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { FileService } from 'src/app/core/services/file.service';
import { SelectInfluencerDialogComponent } from '../select-influencer-dialog/select-influencer-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from 'src/app/core/interfaces/task.Model';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/core/constant/values.constants';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})

export class MainTableComponent {

  @Input()
  task: TaskModel = this.source.task;

  @Input()
  userId: number = this.source.userId;

  @Input()
  budgetSheetId : number = this.source.budgetSheetId;

  @Input()
  brief: any = this.source.brief;

  @Input()
  id: number = this.source.id;

  @Input()
  assignedUser_id : any = this.source.assignedUser_id;

  @Output()
  childEvent = new EventEmitter<string>();

  fileName = '';
  private influencers: InfluencerModel[] = [];
  public form: FormGroup;
  public influencersArray!: FormArray;

  platforms = [
    'Instagram',
    'Tiktok',
    'Snapchat',
    'Twitter',
    'Facebook',
    'Youtube',
  ];
  currencies = ['SAR', 'AED'];

  fileToUpload !: File
  progress = 0;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MainTableComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public source: any,
  ) {
    this.form = this.formBuilder.group({
      rows: this.formBuilder.array([]),
      fileName : ['', Validators.required],
    });


  }

  public submitTable(): void {
    let tableData: any[] = [];
    this.form.value.rows.forEach((rowGroup: any) => {
      tableData.push(rowGroup);
    });


    this.fileName = this.form.value.fileName;

    if(this.budgetSheetId != null){
    this.fileService.deleteBudgetSheetFile(this.budgetSheetId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    }

    this.fileService
      .uploadTable(
        tableData,
        this.brief.data.id,
        this.userId,
        this.fileName,
        Department.TALENT
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.toastrService.success('Excel file created and uploaded successfully!');

          this.downloadFilexlsx(data.data.id, data.data.fileName);

          this.dialogRef.close(true);
        },
        (error) => {
          this.toastrService.error('Excel file creation and upload error!');
        }
      );
  }

  private downloadFilexlsx(id: number, filename: string): void {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  public addRow(influencer: any): void {
    const row = this.formBuilder.group({
      nb: [this.influencers.length + 1, Validators.required],
      name: [influencer.Name, Validators.required],
      platform: [influencer.platform, Validators.required],
      socialLink: [influencer.socialLink, Validators.required],
      followers: [influencer.followers, Validators.required],
      deliverables: [influencer.deliverables, Validators.required],
      currency: [influencer.currency, Validators.required],
      estimatedBudget: [influencer.estimatedBudget, Validators.required],
    });
    this.rows.push(row);
    this.influencers.push(influencer);
  }

  public removeRow(index: number): void {
    this.rows.removeAt(index);
    this.influencers.splice(index, 1);
  }

  public get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(SelectInfluencerDialogComponent);

    dialogRef.afterClosed().subscribe((selectedInfluencer: InfluencerModel) => {
      if (selectedInfluencer) {
        this.addRow(selectedInfluencer);
      }
    });
  }

  public updateFields(i: number, event: any): void {
    const chosenPlatform = event.target.value;
    const row = this.rows.at(i) as FormGroup;

    if (i >= this.influencers.length || !this.influencers[i]) {
      console.error('No influencer exists at this index.');
      return;
    }

    if (chosenPlatform === 'Instagram') {
      const instagramLink = this.influencers[i].InstagramLink;
      const instagramFollowers = this.influencers[i].InstagramFollowers;

      // Ensure these properties exist on the influencer object
      if (instagramLink && instagramFollowers) {
        row.get('socialLink')?.setValue(instagramLink);
        row.get('followers')?.setValue(instagramFollowers);
      }
    }

    if (chosenPlatform === 'Tiktok') {
      const TiktokLink = this.influencers[i].TiktokLink;
      const TiktokFollowers = this.influencers[i].TiktokFollowers;

      // Ensure these properties exist on the influencer object
      if (TiktokLink && TiktokFollowers) {
        row.get('socialLink')?.setValue(TiktokLink);
        row.get('followers')?.setValue(TiktokFollowers);
      }
    }

    if (chosenPlatform === 'Snapchat') {
      const SnapchatLink = this.influencers[i].SnapchatLink;
      const SnapchatFollowers = this.influencers[i].SnapchatFollowers;

      // Ensure these properties exist on the influencer object
      if (SnapchatLink && SnapchatFollowers) {
        row.get('socialLink')?.setValue(SnapchatLink);
        row.get('followers')?.setValue(SnapchatFollowers);
      }
    }

    if (chosenPlatform === 'Twitter') {
      const TwitterLink = this.influencers[i].TwitterLink;
      const TwitterFollowers = this.influencers[i].TwitterFollowers;

      // Ensure these properties exist on the influencer object
      if (TwitterLink && TwitterFollowers) {
        row.get('socialLink')?.setValue(TwitterLink);
        row.get('followers')?.setValue(TwitterFollowers);
      }
    }

    if (chosenPlatform === 'Facebook') {
      const FacebookLink = this.influencers[i].FacebookLink;
      const FacebookFollowers = this.influencers[i].FacebookFollowers;

      // Ensure these properties exist on the influencer object
      if (FacebookLink && FacebookFollowers) {
        row.get('socialLink')?.setValue(FacebookLink);
        row.get('followers')?.setValue(FacebookFollowers);
      }
    }

    if (chosenPlatform === 'Youtube') {
      const YoutubeLink = this.influencers[i].YoutubeLink;
      const YoutubeFollowers = this.influencers[i].YoutubeFollowers;

      // Ensure these properties exist on the influencer object
      if (YoutubeLink && YoutubeFollowers) {
        row.get('socialLink')?.setValue(YoutubeLink);
        row.get('followers')?.setValue(YoutubeFollowers);
      }
    }
  }


  transferedFile(file: File): void {
    this.fileToUpload = file;

  }

  public uploadFileXlsx(): void {
    if (this.fileToUpload) {

      this.fileService.uploadFile(this.fileToUpload, this.brief?.data.id, this.userId, Department['TALENT'])
        .subscribe(
          (data) => {
            // On successful upload, delete the old budget sheet if exists
            if (this.budgetSheetId != null) {
              this.fileService.deleteBudgetSheetFile(this.budgetSheetId)
                .subscribe(
                  (deleteData) => {
                    this.toastrService.success('File uploaded and old budget sheet deleted successfully!');
                    // Instead of reloading, consider fetching data or updating the component's state as required
                    // For the sake of this example, I'll leave it commented out:
                    // this.fetchData(); or this.updateState();
                    this.dialogRef.close(true);

                  },
                  (deleteError) => {
                    this.toastrService.error('Error deleting old budget sheet!');
                    console.error(deleteError);
                  }
                );
            } else {
              this.toastrService.success('File uploaded successfully!');
              // Similar as above, consider updating state or fetching data
              // this.fetchData(); or this.updateState();
              this.dialogRef.close(true);
            }
          },
          (uploadError) => {
            this.toastrService.error('File upload error!');
            console.error(uploadError);
          }
        );
    }
    }

}
