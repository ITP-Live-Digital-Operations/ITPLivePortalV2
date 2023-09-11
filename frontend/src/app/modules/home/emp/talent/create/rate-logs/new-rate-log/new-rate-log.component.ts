import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { currencies, platforms } from 'src/assets/influencer-form-arrays';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-new-rate-log',
  templateUrl: './new-rate-log.component.html',
  styleUrls: ['./new-rate-log.component.scss'],
})
export class NewRateLogComponent {

  public form: FormGroup;
  public logForm: FormGroup;
  private data: any;
  public currencies = currencies;
  public platforms = platforms;
  public influencers: any;

  private influencerData: any;
  private submitted = false;

  public path = PATH;

  private userId : number = this.userService.getID();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: InfluencerService,
    private userService: UserService,
    private logService: LogService,
    private toastrService: ToastrService
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

    if (sessionStorage.getItem('influencerData') != null) {
      this.influencerData = JSON.parse(
        sessionStorage.getItem('influencerData') || '{}'
      );
      this.logForm.controls['Influencer'].setValue(this.influencerData.id);
      /* sessionStorage.removeItem('influencerData'); */
    }
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
          this.router.navigate([this.path['influencerRating'] + this.logForm.value.Influencer]);
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
