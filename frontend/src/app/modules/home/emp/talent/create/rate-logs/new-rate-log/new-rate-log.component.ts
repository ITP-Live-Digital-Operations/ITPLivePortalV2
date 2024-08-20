import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { currencies, platforms } from 'src/assets/influencer-form-arrays';
import { PATH } from 'src/app/core/constant/routes.constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-rate-log',
  templateUrl: './new-rate-log.component.html',
  styleUrls: ['./new-rate-log.component.scss'],
})
export class NewRateLogComponent {

  @Input() influencerId!: number;

  public form: FormGroup;
  public logForm: FormGroup;
  private data: any;
  public currencies = currencies;
  public platforms = platforms;
  public influencers: any;
  private submitted = false;

  public path = PATH;

  private userId : number = this.userService.getID();



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: InfluencerService,
    private userService: UserService,
    private dialogRef: MatDialogRef<NewRateLogComponent>,

    private logService: LogService,
    private toastrService: ToastrService
  ) {
    this.logForm = this.formBuilder.group({
      Influencer: ['', Validators.required],
      Campaign: ['', Validators.required],
      Currency: ['', Validators.required],
      Rate: ['', Validators.required],
      Notes: [''],
      Time_to_reply: [''],
    });

    this.form = this.formBuilder.group({
      fields: this.formBuilder.array([]),
    });


  }

  ngOnInit(): void {
    this.getInfluencers();

    this.addFields();

    this.logForm.controls['Influencer'].setValue(this.influencerId);

  }

  public get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  public addFields(): void {
    const fields = this.formBuilder.group({
      Platform: ['', Validators.required],
      Deliverable: ['', Validators.required],
      Quantity: ['', Validators.required]
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

  public onSubmit(): void {
    if (this.submitted) {
      return;
    }

    this.submitted = true;

    if (this.form.valid) {
      console.log(this.form.value.fields);
      const inputData = { UserID: this.userId, InfluencerID: this.logForm.value.Influencer, Campaign: this.logForm.value.Campaign,  type: 'package',Time_to_reply: this.logForm.value.Time_to_reply, Notes: this.logForm.value.Notes, Currency: this.logForm.value.Currency, Rate: this.logForm.value.Rate, packageItems: this.form.value.fields, rateLogItems : {} }

      this.logService.addLog(inputData).subscribe(item => {
        this.data = item;
        if (this.data.status === "success") {
          this.toastrService.success('Log Added Successfully!');
          sessionStorage.removeItem('influencerData');
          this.dialogRef.close();
        }
        else {
          this.toastrService.error('Error! Please Try Again!');
        }

      })
    }
    setTimeout(() => {
      this.submitted = false;
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
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'Tiktok':
        return [
          'Short-form video content',
          'Hashtag challenges',
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'Snapchat':
        return [
          'Snap stories',
          'Geofilters and lenses',
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'X':
        return [
          'Tweets',
          'Retweets',
          'Twitter threads',
          'Hashtags',
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'Facebook':
        return [
          'Facebook posts',
          'Facebook Stories',
          'Live videos',
          'Groups',
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'Youtube':
        return [
          'Video content',
          'Livestreams',
          'Live videos',
          'Collaborations with other YouTubers or brands',
          'Product reviews or demonstrations',
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
        ];
      case 'Other':
        return [
          'Influencer partnerships and collaborations',
          'Content usage rights',
          'Half day shoot',
          'Full day shoot',
          'Event attendance',
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
  formatNumber(value: number | null): string {
    return value !== null ? value.toLocaleString() : '';
  }

  onNumericInput(fieldName: string, value: string): void {
    const parsedValue = this.parseFormattedNumber(value);
    this.logForm.get(fieldName)?.setValue(parsedValue, { emitEvent: false });
  }

  onFieldNumericInput(index: number, fieldName: string, value: string): void {
    const parsedValue = this.parseFormattedNumber(value);
    ((this.form.get('fields') as FormArray).at(index) as FormGroup).get(fieldName)?.setValue(parsedValue, { emitEvent: false });
  }


  parseFormattedNumber(value: string): number {
    return Number(value.replace(/,/g, ''));
  }
}
