import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/core/constant/routes.constants';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { currencies, platforms } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-edit-item-log',
  templateUrl: './edit-item-log.component.html',
  styleUrls: ['./edit-item-log.component.scss'],
})
export class EditItemLogComponent {
  public form: FormGroup;
  public logForm: FormGroup;

  public currencies = currencies;
  public platforms = platforms;
  public influencers: any;
  public log: any;
  public logItemId!: number;
  private submitted = false;
  public path = PATH;
  private userId: number = this.userService.getID();
  public id: number = this.source.id;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private influencerService: InfluencerService,
    private userService: UserService,
    private logService: LogService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public source: any
  ) {
    this.logForm = this.formBuilder.group({
      Influencer: ['', Validators.required],
      Campaign: ['', Validators.required],
      Notes: [''],
      Time_to_reply: ['', Validators.required],
    });

    this.form = this.formBuilder.group({
      fields: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.getInfluencers();

    this.addFields();

    this.loadRateLog();
  }

  public get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  public addFields(): void {
    const fields = this.formBuilder.group({
      Platform: ['', Validators.required],
      Deliverable: ['', Validators.required],
      Quantity: ['', Validators.required],
      Currency: ['', Validators.required],
      Rate: ['', Validators.required],
    });

    this.fields.push(fields);
  }

  public removeFields(index: number): void {
    this.fields.removeAt(index);
  }

  private getInfluencers(): void {
    this.influencerService.getInfluencerNames().subscribe((item) => {
      this.influencers = item;
    });
  }

  private loadRateLog(): void {
    this.logService.getLogById(this.id).subscribe((data) => {
      this.log = data;
      console.log(this.log);
      this.logForm.patchValue({
        Influencer: this.log.influencerID,
        Campaign: this.log.campaign,
        Notes: this.log.notes,
        Time_to_reply: this.log.time_to_reply,
      });

      this.logItemId = this.log.logItems[0].id;
      console.log(this.logItemId);

      this.fields.controls.forEach((control, index) => {
        control.patchValue({
          Platform: this.log.logItems[index].platform,
          Deliverable: this.log.logItems[index].deliverable,
          Quantity: this.log.logItems[index].quantity,
          Currency: this.log.logItems[index].currency,
          Rate: this.log.logItems[index].rate,
        });
      });
    });
  }

  public onSubmit(): void {
    if (this.submitted) {
      return;
    }

    this.submitted = true;

    if (this.form.valid) {
      const inputData = {
        UserID: this.userId,
        InfluencerID: this.logForm.value.Influencer,
        Campaign: this.logForm.value.Campaign,
        type: 'single',
        Notes: this.logForm.value.Notes,
        Time_to_reply: this.logForm.value.Time_to_reply,
        Item: this.form.value.fields,
        packageItems: {},
        logItemId: this.logItemId,
      };
      console.log(inputData);
      this.logService.updateSingleLog(this.id, inputData).subscribe((data) => {
        this.toastrService.success('Log updated successfully');
        this.router.navigate([this.path['rateLogs']]);
      });
    }
    this.dialog.closeAll();
  }

  public getAvailableDeliverables(platformIndex: number): string[] {
    const platform = this.fields.controls[platformIndex].get('Platform')?.value;
    switch (platform) {
      case 'Instagram':
        return [
          'Static image posts',
          'Carousel posts',
          'Instagram Stories',
          'Instagram Reels',
          'IGTV',
          'Influencer partnerships and collaborations',
        ];
      case 'Tiktok':
        return [
          'Short-form video content',
          'Hashtag challenges',
          'Influencer partnerships and collaborations',
        ];
      case 'Snapchat':
        return [
          'Snap stories',
          'Geofilters and lenses',
          'Influencer partnerships and collaborations',
        ];
      case 'Twitter':
        return [
          'Tweets',
          'Retweets',
          'Twitter threads',
          'Hashtags',
          'Influencer partnerships and collaborations',
        ];
      case 'Facebook':
        return [
          'Facebook posts',
          'Facebook Stories',
          'Live videos',
          'Groups',
          'Influencer partnerships and collaborations',
        ];
      case 'Youtube':
        return [
          'Video content',
          'Livestreams',
          'Live videos',
          'Collaborations with other YouTubers or brands',
          'Product reviews or demonstrations',
          'Influencer partnerships and collaborations',
        ];
      default:
        return [];
    }
  }

  public onPlatformChange(platformIndex: number): void {
    const platform = this.fields.controls[platformIndex].get('Platform')?.value;
    const deliverableControl =
      this.fields.controls[platformIndex].get('Deliverable');
    deliverableControl?.setValue(null);
    deliverableControl?.enable();
    if (platform) {
      deliverableControl?.setValidators(Validators.required);
    } else {
      deliverableControl?.clearValidators();
    }
  }
}
