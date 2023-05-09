import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';
import { campaignobjectives, clientIndustries, currencies, arabCountries } from 'src/assets/influencer-form-arrays';

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


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private userService: UserService
  ) {
    this.newSalesBriefForm = this.formBuilder.group({
      Agency: ['', [Validators.required]],
      Client: ['', [Validators.required]],
      ClientIndustry: ['', [Validators.required]],
      CampaignName: ['', [Validators.required]],
      CampaignOverview: [''],
      CampaignObjective: [''],
      CampaignObjectiveDetails: [''],
      NumberofRecommendations: [''],
      Currency: [''],
      Budget: [''],
      CampaignStartDate: [''],
      CampaignEndDate: [''],
      CampaignMessagePhaseOne: [''],
      CampaignMessagePhaseTwo: [''],
      CampaignMessagePhaseThree: [''],
      ContentDeliverables: new FormGroup({
        Instagram: new FormControl(false),
        Facebook: new FormControl(false),
        Twitter: new FormControl(false),
        YouTube: new FormControl(false),
        TikTok: new FormControl(false),
        SnapChat: new FormControl(false),
        Linkedin: new FormControl(false),
        Twitch: new FormControl(false),
      }),
      BrandExclusivityDurationinDays: [''],
      VideoProduction: new FormControl(false),
      VideoEditing : new FormControl(false),
      InfluencerAgeRange: new FormGroup({
        AgeGroup1: new FormControl(false),
        AgeGroup2: new FormControl(false),
        AgeGroup3: new FormControl(false),
        AgeGroup4: new FormControl(false),
        AgeGroup5: new FormControl(false),
    }),
    InfluencerLocation: new FormGroup({
      Algeria: new FormControl(false),
      Bahrain: new FormControl(false),
      Eygpt: new FormControl(false),
      Iraq: new FormControl(false),
      Jordan: new FormControl(false),
      Kuwait: new FormControl(false),
      Lebanon: new FormControl(false),
      Libya: new FormControl(false),
      Morocco: new FormControl(false),
      Oman: new FormControl(false),
      Qatar: new FormControl(false),
      SaudiArabia: new FormControl(false),
      Syria: new FormControl(false),
      Tunisia: new FormControl(false),
      UAE: new FormControl(false),
  }),
    InfluencerNationality: new FormGroup({
      Algeria: new FormControl(false),
      Bahrain: new FormControl(false),
      Eygpt: new FormControl(false),
      Iraq: new FormControl(false),
      Jordan: new FormControl(false),
      Kuwait: new FormControl(false),
      Lebanon: new FormControl(false),
      Libya: new FormControl(false),
      Morocco: new FormControl(false),
      Oman: new FormControl(false),
      Qatar: new FormControl(false),
      SaudiArabia: new FormControl(false),
      Syria: new FormControl(false),
      Tunisia: new FormControl(false),
      UAE: new FormControl(false),
    }),
    InfluencerGender: [''],
    SimilarProfileLink: [''],
    InfluencerInterest: new FormGroup({
      Beauty: new FormControl(false),
      Lifestyle: new FormControl(false),
      Sports: new FormControl(false),
      Food: new FormControl(false),
      Gaming: new FormControl(false),
      Business: new FormControl(false),
      Travel: new FormControl(false),
      Comedy: new FormControl(false),
      Celebrities: new FormControl(false),
      Health: new FormControl(false),
      Nutrition: new FormControl(false),
      Bodybuilding: new FormControl(false),
      Humanitarian: new FormControl(false),
      Automotives: new FormControl(false),
      Tech: new FormControl(false),
      Furniture: new FormControl(false),
      Shopping: new FormControl(false),
      NGO: new FormControl(false),
    }),
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

    AudienceLocation: new FormGroup({
      Algeria: new FormControl(false),
      Bahrain: new FormControl(false),
      Eygpt: new FormControl(false),
      Iraq: new FormControl(false),
      Jordan: new FormControl(false),
      Kuwait: new FormControl(false),
      Lebanon: new FormControl(false),
      Libya: new FormControl(false),
      Morocco: new FormControl(false),
      Oman: new FormControl(false),
      Qatar: new FormControl(false),
      SaudiArabia: new FormControl(false),
      Syria: new FormControl(false),
      Tunisia: new FormControl(false),
      UAE: new FormControl(false),
    }),

    AudienceNationality: new FormGroup({
      Algeria: new FormControl(false),
      Bahrain: new FormControl(false),
      Eygpt: new FormControl(false),
      Iraq: new FormControl(false),
      Jordan: new FormControl(false),
      Kuwait: new FormControl(false),
      Lebanon: new FormControl(false),
      Libya: new FormControl(false),
      Morocco: new FormControl(false),
      Oman: new FormControl(false),
      Qatar: new FormControl(false),
      SaudiArabia: new FormControl(false),
      Syria: new FormControl(false),
      Tunisia: new FormControl(false),
      UAE: new FormControl(false),
    }),

    AudienceGender: [''],
    AudienceInterest: new FormGroup({
      Beauty: new FormControl(false),
      Lifestyle: new FormControl(false),
      Sports: new FormControl(false),
      Food: new FormControl(false),
      Gaming: new FormControl(false),
      Business: new FormControl(false),
      Travel: new FormControl(false),
      Comedy: new FormControl(false),
      Celebrities: new FormControl(false),
      Health: new FormControl(false),
      Nutrition: new FormControl(false),
      Bodybuilding: new FormControl(false),
      Humanitarian: new FormControl(false),
      Automotives: new FormControl(false),
      Tech: new FormControl(false),
      Furniture: new FormControl(false),
      Shopping: new FormControl(false),
      NGO: new FormControl(false),
    }),

    ConfirmedInfluencerHandles: [''],
    PreviousBrandAmbassadorsName: [''],



    });
  }



  createSalesBrief() {
    const createdByUserId = this.userService.getID();
    const salesBrief = {
      ...this.newSalesBriefForm.value,
      ContentDeliverables: this.processFormGroups(this.newSalesBriefForm.get('ContentDeliverables')),
      InfluencerAgeRange: this.processFormGroups(this.newSalesBriefForm.get('InfluencerAgeRange')),
      InfluencerLocation: this.processFormGroups(this.newSalesBriefForm.get('InfluencerLocation')),
      InfluencerNationality: this.processFormGroups(this.newSalesBriefForm.get('InfluencerNationality')),
      InfluencerInterest: this.processFormGroups(this.newSalesBriefForm.get('InfluencerInterest')),
      InfluencerNumberOfFollowers: this.processFormGroups(this.newSalesBriefForm.get('InfluencerNumberOfFollowers')),
      AudienceAgeRange: this.processFormGroups(this.newSalesBriefForm.get('AudienceAgeRange')),
      AudienceLocation: this.processFormGroups(this.newSalesBriefForm.get('AudienceLocation')),
      AudienceNationality: this.processFormGroups(this.newSalesBriefForm.get('AudienceNationality')),
      AudienceInterest: this.processFormGroups(this.newSalesBriefForm.get('AudienceInterest')),

      Ready: false,
      ViewedByTalent: false,
    };
    console.log( {CreatedbyID: createdByUserId, ...salesBrief });

    this.salesService.createBrief({ CreatedbyID: createdByUserId, ...salesBrief }).subscribe(
      () => {
        alertify.success('Sales brief created successfully');
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
    return trueValues.join(', ');
  }
}

