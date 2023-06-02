import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { NotificationService } from 'src/app/core/Services/notification.service';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';
import { campaignobjectives, clientIndustries, currencies, arabCountries, briefPlatforms, countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-new-brief',
  templateUrl: './new-brief.component.html',
  styleUrls: ['./new-brief.component.css'],
})
export class NewBriefComponent {
  newSalesBriefForm: FormGroup;
  clientIndustries: string[] = clientIndustries;
  campaignobjectives: string[] = campaignobjectives;
  currencies: string[] = currencies;
  arabCountries: string[] = arabCountries;
  briefPlatforms : string[] = briefPlatforms
  countries : string[] = countries

  newBrief: any;

  showInfo1 = false;
  showInfo2 = false;
  showInfo3 = false;
  showInfo4 = false;
  showInfo5 = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.newSalesBriefForm = this.formBuilder.group({
      Agency: ['', [Validators.required]],
      Client: ['', [Validators.required]],
      ClientIndustry: ['', [Validators.required]],
      CampaignName: ['', [Validators.required]],
      CampaignOverview: [''],
      CampaignObjective: [''],
      CampaignObjectiveDetails: [''],
      NumberofRecommendations: ['', [Validators.required]],
      Currency: [''],
      Budget: ['', [Validators.required]],
      CampaignStartDate: ['', [Validators.required]],
      CampaignEndDate: ['', [Validators.required]],
      CampaignMessagePhaseOne: [''],
      CampaignMessagePhaseTwo: [''],
      CampaignMessagePhaseThree: [''],
      ContentDeliverables: [''],
      BrandExclusivityDurationinDays: ['', [Validators.required]],
      VideoProduction: new FormControl(false),
      VideoEditing : new FormControl(false),
      InfluencerAgeRange: new FormGroup({
        AgeGroup1: new FormControl(false),
        AgeGroup2: new FormControl(false),
        AgeGroup3: new FormControl(false),
        AgeGroup4: new FormControl(false),
        AgeGroup5: new FormControl(false),
    }),
    InfluencerLocation: [''],
    InfluencerNationality: [''],
    InfluencerGender: [''],
    SimilarProfileLink: [''],
    InfluencerInterest: [''],
    InfluencerNumberOfFollowers: new FormGroup({
      Nano: new FormControl(false),
      Micro: new FormControl(false),
      Macro: new FormControl(false),
      Mega: new FormControl(false),
      Celebrity: new FormControl(false),
    }),
    NoteForNumberOfFollowers: [''],
    AudienceAgeRange: new FormGroup({
      AgeGroup1: new FormControl(false),
      AgeGroup2: new FormControl(false),
      AgeGroup3: new FormControl(false),
      AgeGroup4: new FormControl(false),
      AgeGroup5: new FormControl(false),
    }),

    AudienceLocation: [''],

    AudienceNationality: [''],

    AudienceGender: [''],
    PrimaryAudienceInterest: [''],

    SecondaryAudienceInterest: [''],

    ConfirmedInfluencerHandles: [''],
    PreviousBrandAmbassadorsName: [''],

    Performance : new FormControl(false),
    Event : new FormControl(false),
    Concept : new FormControl(false),
    Strategy : new FormControl(false),

    ItpDepartment: [''],
    KPIs  : [''],
    });
  }



  createSalesBrief() {


    let contentDeliverablesValue = this.newSalesBriefForm.get('ContentDeliverables')!.value;
    let influencerLocationValue = this.newSalesBriefForm.get('InfluencerLocation')!.value;
    let influencerNationalityValue = this.newSalesBriefForm.get('InfluencerNationality')!.value;
    let influencerInterestValue = this.newSalesBriefForm.get('InfluencerInterest')!.value;
    let audienceLocationValue = this.newSalesBriefForm.get('AudienceLocation')!.value;
    let audienceNationalityValue = this.newSalesBriefForm.get('AudienceNationality')!.value;
    let primaryAudienceInterestValue = this.newSalesBriefForm.get('PrimaryAudienceInterest')!.value;
    let secondaryAudienceInterestValue = this.newSalesBriefForm.get('SecondaryAudienceInterest')!.value;

    const createdByUserId = this.userService.getID();
    const salesBrief = {
      ...this.newSalesBriefForm.value,

      ContentDeliverables: Array.isArray(contentDeliverablesValue) ? contentDeliverablesValue.join(', ') : '',
      InfluencerAgeRange: this.processFormGroups(this.newSalesBriefForm.get('InfluencerAgeRange')),
      InfluencerLocation: Array.isArray(influencerLocationValue) ? influencerLocationValue.join(', ') : '',
      InfluencerNationality: Array.isArray(influencerNationalityValue) ? influencerNationalityValue.join(', ') : '',
      InfluencerInterest: Array.isArray(influencerInterestValue) ? influencerInterestValue.join(', ') : '',
      InfluencerNumberOfFollowers: this.processFormGroups(this.newSalesBriefForm.get('InfluencerNumberOfFollowers')),
      AudienceAgeRange: this.processFormGroups(this.newSalesBriefForm.get('AudienceAgeRange')),
      AudienceLocation: Array.isArray(audienceLocationValue) ? audienceLocationValue.join(', ') : '',
      AudienceNationality: Array.isArray(audienceNationalityValue) ? audienceNationalityValue.join(', ') : '',
      PrimaryAudienceInterest: Array.isArray(primaryAudienceInterestValue) ? primaryAudienceInterestValue.join(', ') : '',
      SecondaryAudienceInterest: Array.isArray(secondaryAudienceInterestValue) ? secondaryAudienceInterestValue.join(', ') : '',

      Ready: false,
      ViewedByTalent: false,
    };
    console.log( {CreatedbyID: createdByUserId, ...salesBrief });

    this.salesService.createBrief({ CreatedbyID: createdByUserId, ...salesBrief }).subscribe(
      (briefid) => {

        alertify.success('Sales brief created successfully');

        if(this.newSalesBriefForm.get('ItpDepartment')?.value == 'Originals' || this.newSalesBriefForm.get('ItpDepartment')?.value == 'UAE'){
          let id = 23;
          let input = { message : 'New Sales Brief has been created', link: `/home/talent/assignBrief/${briefid}`}
          this.notificationService.createNotification( id, input).subscribe( () => {})
        }
        else if(this.newSalesBriefForm.get('ItpDepartment')?.value == 'KSA' || this.newSalesBriefForm.get('ItpDepartment')?.value == 'Gaming' ){
          let id = 15;
          let input = { message : 'New Sales Brief has been created', link: `/home/talent/assignBrief/${briefid}`}

          this.notificationService.createNotification( id, input).subscribe( () => {})
        }


        this.router.navigate(['home/sales/forms']);


      },
      (error) => {
        console.error('An error occurred while creating the sales brief: ', error);
        alertify.error('An error occurred while creating the sales brief');
        // Display a user-friendly error message to the user.
      }

    );


  }

  navigateToForms() {
    this.router.navigate(['home/sales/forms']);
  }

  processFormGroups(formGroup: any): string {
    const trueValues: string[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      if (formGroup.get(key).value) {
        trueValues.push(key);
      }
    });
    return trueValues.length > 0 ? trueValues.join(', ') : 'None';
  }
}

