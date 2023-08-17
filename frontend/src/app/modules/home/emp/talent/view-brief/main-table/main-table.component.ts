import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluencerModel } from 'src/app/core/interfaces/influencersModel';
import { FileService } from 'src/app/core/services/file.service';
import { SelectInfluencerDialogComponent } from '../select-influencer-dialog/select-influencer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskModel } from 'src/app/core/interfaces/task.Model';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})

export class MainTableComponent {

  @Input()
  task!: TaskModel;

  @Input()
  user_id!: number;

  @Input()
  budgetSheetId!: number;

  @Input()
  brief: any;

  @Input()
  id!: number;

  influencers: InfluencerModel[] = [];
  form: FormGroup;
  influencersArray!: FormArray;
  platforms = [
    'Instagram',
    'Tiktok',
    'Snapchat',
    'Twitter',
    'Facebook',
    'Youtube',
  ];
  currencies = ['SAR', 'AED'];

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private dialog: MatDialog,
  ) {
    this.form = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
  }

  public submitTable() {
    let tableData: any[] = [];
    this.form.value.rows.forEach((rowGroup: any) => {
      tableData.push(rowGroup);
    });

    this.fileService.deleteBudgetSheetFile(this.budgetSheetId).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );

    this.fileService
      .uploadTable(
        tableData,
        this.brief.data.id,
        this.user_id,
        this.brief.data.Client
      )
      .subscribe(
        (data) => {
          // alertify.success('Excel file created and uploaded successfully');
          this.downloadFilexlsx(data.fileData.id, data.fileData.filename);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          console.log(error);

          // alertify.error('Excel file creation and upload error');
        }
      );
  }

  downloadFilexlsx(id: number, filename: string) {
    this.fileService.downloadFile(id, filename).subscribe((data: any) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  addRow(influencer: any): void {
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

  removeRow(index: number): void {
    this.rows.removeAt(index);
    this.influencers.splice(index, 1);
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectInfluencerDialogComponent);

    dialogRef.afterClosed().subscribe((selectedInfluencer: InfluencerModel) => {
      if (selectedInfluencer) {
        this.addRow(selectedInfluencer);
      }
    });
  }

  updateFields(i: number, event: any): void {
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
}
