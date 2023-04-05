import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';
import { campaignobjectives, clientIndustries, currencies } from 'src/assets/influencer-form-arrays';

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
      DeadlineForRecommendations: [''],
      CampaignMessagePhaseOne: [''],
      CampaignMessagePhaseTwo: [''],
      CampaignMessagePhaseThree: [''],
      contentDeliverables: new FormGroup({
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

  })
  }

  createSalesBrief() {
    const createdByUserId = this.userService.getID();
    const salesBrief = {
      ...this.newSalesBriefForm.value,
      Ready: false,
      ViewedByTalent: false,
    };
    console.log( {CreatedbyID: createdByUserId, ...salesBrief });

   /*  this.salesService.createBrief({ CreatedbyID: createdByUserId, ...salesBrief }).subscribe(
      () => {
        alertify.success('Sales brief created successfully');
        this.router.navigate(['home/sales/forms']);
      },
      (error) => {
        console.error('An error occurred while creating the sales brief: ', error);
        alertify.error('An error occurred while creating the sales brief');
        // Display a user-friendly error message to the user.
      }
    ); */
  }

  navigateToForms() {
    this.router.navigate(['home/sales/forms']);
  }
}

