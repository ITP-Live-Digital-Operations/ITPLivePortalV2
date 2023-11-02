import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/core/constant/routes.constants';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { currencies, platforms } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-edit-package-log',
  templateUrl: './edit-package-log.component.html',
  styleUrls: ['./edit-package-log.component.scss'],
})
export class EditPackageLogComponent {
  public form: FormGroup;
  public logForm: FormGroup;
  private data: any;
  public currencies = currencies;
  public platforms = platforms;
  public influencers: any;

  private submitted = false;

  public path = PATH;
  public log: any;
  private userId: number = this.userService.getID();
  public id: number = this.source.id;
  private packageIds : number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: InfluencerService,
    private userService: UserService,
    private logService: LogService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public source: any
  ) {
    this.logForm = this.formBuilder.group({
      Influencer: ['', Validators.required],
      Campaign: ['', Validators.required],
      Currency: ['', Validators.required],
      Rate: ['', Validators.required],
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
    });

    this.fields.push(fields);
  }

  public removeFields(index: number): void {
    this.fields.removeAt(index);
  }

  private getInfluencers(): void {
    this.service.getInfluencerNames().subscribe((item) => {
      this.influencers = item;
    });
  }

  private loadRateLog(): void {
    this.logService.getLogById(this.id).subscribe((item) => {
      this.log = item;

      this.logForm.patchValue({
        Influencer: this.log.influencerID,
        Campaign: this.log.campaign,
        Notes: this.log.notes,
        Time_to_reply: this.log.time_to_reply,
        Currency: this.log.currency,
        Rate: this.log.rate,
      });

      for (let i = 0; i < this.log.packages.length; i++) {
        if(this.log.packages[i].id != null){
        
        this.addFields();
        this.packageIds.push(this.log.packages[i].id);
        }
        this.removeFields(this.log.packages.length);
      }

      this.fields.controls.forEach((control, index) => {
        control.patchValue({
          Platform: this.log.packages[index].platform,
          Deliverable: this.log.packages[index].deliverable,
          Quantity: this.log.packages[index].quantity,
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
      console.log(this.form.value.fields);
      const inputData = {
        UserID: this.userId,
        InfluencerID: this.logForm.value.Influencer,
        Campaign: this.logForm.value.Campaign,
        type: 'package',
        Time_to_reply: this.logForm.value.Time_to_reply,
        Notes: this.logForm.value.Notes,
        Currency: this.logForm.value.Currency,
        Rate: this.logForm.value.Rate,
        package: this.form.value.fields,
        rateLogItems: {},
        packageIds: this.packageIds
      };

      this.logService.updatePackageLog(this.id, inputData).subscribe((item) => {
        this.data = item;
        if (this.data.status === 'success') {
          this.toastrService.success('Log Added Successfully!');
          sessionStorage.removeItem('influencerData');
          this.router.navigate([
            this.path['influencerRating'] + this.logForm.value.Influencer,
          ]);
        } else {
          this.toastrService.error('Error! Please Try Again!');
        }
      });
    }
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
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
