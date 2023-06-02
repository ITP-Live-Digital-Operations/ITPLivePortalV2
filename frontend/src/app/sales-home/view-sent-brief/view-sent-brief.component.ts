import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';
import {
  campaignobjectives,
  clientIndustries,
  currencies,
  arabCountries,
  briefPlatforms,
  countries,
} from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { TaskService } from 'src/app/core/Services/task.service';
@Component({
  selector: 'app-view-sent-brief',
  templateUrl: './view-sent-brief.component.html',
  styleUrls: ['./view-sent-brief.component.css'],
})
export class ViewSentBriefComponent implements OnInit {
  newSalesBriefForm: FormGroup;
  clientIndustries: string[] = clientIndustries;
  campaignobjectives: string[] = campaignobjectives;
  currencies: string[] = currencies;
  arabCountries: string[] = arabCountries;
  briefPlatforms: string[] = briefPlatforms;
  countries: string[] = countries;

  briefId: any;
  briefData: any;
  salesBrief: any;
  taskData: any;

  assigned_user: any;

  showInfo1 = false;
  showInfo2 = false;
  showInfo3 = false;
  showInfo4 = false;
  showInfo5 = false;

  ngOnInit(): void {
    this.loadSalesBriefData();
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
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
      VideoEditing: new FormControl(false),
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

      Performance: new FormControl(false),
      Event: new FormControl(false),
      Concept: new FormControl(false),
      Strategy: new FormControl(false),

      ItpDepartment: [''],
      KPIs: [''],
    });
  }

  createSalesBrief() {
    let contentDeliverablesValue = this.newSalesBriefForm.get(
      'ContentDeliverables'
    )!.value;
    let influencerLocationValue =
      this.newSalesBriefForm.get('InfluencerLocation')!.value;
    let influencerNationalityValue = this.newSalesBriefForm.get(
      'InfluencerNationality'
    )!.value;
    let influencerInterestValue =
      this.newSalesBriefForm.get('InfluencerInterest')!.value;
    let audienceLocationValue =
      this.newSalesBriefForm.get('AudienceLocation')!.value;
    let audienceNationalityValue = this.newSalesBriefForm.get(
      'AudienceNationality'
    )!.value;
    let primaryAudienceInterestValue = this.newSalesBriefForm.get(
      'PrimaryAudienceInterest'
    )!.value;
    let secondaryAudienceInterestValue = this.newSalesBriefForm.get(
      'SecondaryAudienceInterest'
    )!.value;

    const createdByUserId = this.userService.getID();
    const salesBrief = {
      ...this.newSalesBriefForm.value,

      ContentDeliverables: Array.isArray(contentDeliverablesValue)
        ? contentDeliverablesValue.join(', ')
        : '',
      InfluencerAgeRange: this.processFormGroups(
        this.newSalesBriefForm.get('InfluencerAgeRange')
      ),
      InfluencerLocation: Array.isArray(influencerLocationValue)
        ? influencerLocationValue.join(', ')
        : '',
      InfluencerNationality: Array.isArray(influencerNationalityValue)
        ? influencerNationalityValue.join(', ')
        : '',
      InfluencerInterest: Array.isArray(influencerInterestValue)
        ? influencerInterestValue.join(', ')
        : '',
      InfluencerNumberOfFollowers: this.processFormGroups(
        this.newSalesBriefForm.get('InfluencerNumberOfFollowers')
      ),
      AudienceAgeRange: this.processFormGroups(
        this.newSalesBriefForm.get('AudienceAgeRange')
      ),
      AudienceLocation: Array.isArray(audienceLocationValue)
        ? audienceLocationValue.join(', ')
        : '',
      AudienceNationality: Array.isArray(audienceNationalityValue)
        ? audienceNationalityValue.join(', ')
        : '',
      PrimaryAudienceInterest: Array.isArray(primaryAudienceInterestValue)
        ? primaryAudienceInterestValue.join(', ')
        : '',
      SecondaryAudienceInterest: Array.isArray(secondaryAudienceInterestValue)
        ? secondaryAudienceInterestValue.join(', ')
        : '',

      Ready: false,
      ViewedByTalent: false,
    };
    console.log({ CreatedbyID: createdByUserId, ...salesBrief });

    this.salesService.updateBrief(this.briefId, salesBrief).subscribe(
      () => {
        alertify.success('Sales brief edited successfully');
        this.router.navigate(['home/sales/forms']);
      },
      (error) => {
        console.error(
          'An error occurred while creating the sales brief: ',
          error
        );
        alertify.error('An error occurred while creating the sales brief');
        // Display a user-friendly error message to the user.
      }
    );
  }

  loadSalesBriefData() {
    this.activatedRoute.params.subscribe((params) => {
      this.briefId = params['id'];
    });

    this.salesService.getSalesBrief(this.briefId).subscribe((brief) => {
      this.briefData = brief;

      console.log('brief data: ', this.briefData.data);
      this.salesBrief = this.briefData.data;

      if (typeof this.salesBrief.ContentDeliverables === 'string') {
        this.salesBrief.ContentDeliverables =
          this.salesBrief.ContentDeliverables !== ''
            ? this.salesBrief.ContentDeliverables.split(', ')
            : [];
      } else {
        this.salesBrief.ContentDeliverables = [];
      }
      if (typeof this.salesBrief.InfluencerLocation === 'string') {
        this.salesBrief.InfluencerLocation =
          this.salesBrief.InfluencerLocation !== ''
            ? this.salesBrief.InfluencerLocation.split(', ')
            : [];
      } else {
        this.salesBrief.InfluencerLocation = [];
      }
      if (typeof this.salesBrief.InfluencerNationality === 'string') {
        this.salesBrief.InfluencerNationality =
          this.salesBrief.InfluencerNationality !== ''
            ? this.salesBrief.InfluencerNationality.split(', ')
            : [];
      } else {
        this.salesBrief.InfluencerNationality = [];
      }
      if (typeof this.salesBrief.InfluencerInterest === 'string') {
        this.salesBrief.InfluencerInterest =
          this.salesBrief.InfluencerInterest !== ''
            ? this.salesBrief.InfluencerInterest.split(', ')
            : [];
      } else {
        this.salesBrief.InfluencerInterest = [];
      }
      if (typeof this.salesBrief.AudienceLocation === 'string') {
        this.salesBrief.AudienceLocation =
          this.salesBrief.AudienceLocation !== ''
            ? this.salesBrief.AudienceLocation.split(', ')
            : [];
      } else {
        this.salesBrief.AudienceLocation = [];
      }
      if (typeof this.salesBrief.AudienceNationality === 'string') {
        this.salesBrief.AudienceNationality =
          this.salesBrief.AudienceNationality !== ''
            ? this.salesBrief.AudienceNationality.split(', ')
            : [];
      } else {
        this.salesBrief.AudienceNationality = [];
      }
      if (typeof this.salesBrief.PrimaryAudienceInterest === 'string') {
        this.salesBrief.PrimaryAudienceInterest =
          this.salesBrief.PrimaryAudienceInterest !== ''
            ? this.salesBrief.PrimaryAudienceInterest.split(', ')
            : [];
      } else {
        this.salesBrief.PrimaryAudienceInterest = [];
      }
      if (typeof this.salesBrief.SecondaryAudienceInterest === 'string') {
        this.salesBrief.SecondaryAudienceInterest =
          this.salesBrief.SecondaryAudienceInterest !== ''
            ? this.salesBrief.SecondaryAudienceInterest.split(', ')
            : [];
      } else {
        this.salesBrief.SecondaryAudienceInterest = [];
      }

      if (
        typeof this.salesBrief.InfluencerAgeRange === 'string' &&
        this.salesBrief.InfluencerAgeRange !== ''
      ) {
        this.salesBrief.InfluencerAgeRange =
          this.salesBrief.InfluencerAgeRange.split(', ');
      } else {
        this.salesBrief.InfluencerAgeRange = [];
      }
      if (
        typeof this.salesBrief.InfluencerNumberOfFollowers === 'string' &&
        this.salesBrief.InfluencerNumberOfFollowers !== ''
      ) {
        this.salesBrief.InfluencerNumberOfFollowers =
          this.salesBrief.InfluencerNumberOfFollowers.split(', ');
      } else {
        this.salesBrief.InfluencerNumberOfFollowers = [];
      }
      if (
        typeof this.salesBrief.AudienceAgeRange === 'string' &&
        this.salesBrief.AudienceAgeRange !== ''
      ) {
        this.salesBrief.AudienceAgeRange =
          this.salesBrief.AudienceAgeRange.split(', ');
      } else {
        this.salesBrief.AudienceAgeRange = [];
      }

      this.newSalesBriefForm.setControl(
        'InfluencerAgeRange',
        new FormGroup({
          AgeGroup1: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup1')
          ),
          AgeGroup2: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup2')
          ),
          AgeGroup3: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup3')
          ),
          AgeGroup4: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup4')
          ),
          AgeGroup5: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup5')
          ),
        })
      );

      this.newSalesBriefForm.setControl(
        'InfluencerNumberOfFollowers',
        new FormGroup({
          Nano: new FormControl(
            this.salesBrief.InfluencerNumberOfFollowers.includes('Nano')
          ),
          Micro: new FormControl(
            this.salesBrief.InfluencerNumberOfFollowers.includes('Micro')
          ),
          Macro: new FormControl(
            this.salesBrief.InfluencerNumberOfFollowers.includes('Macro')
          ),
          Mega: new FormControl(
            this.salesBrief.InfluencerNumberOfFollowers.includes('Mega')
          ),
          Celebrity: new FormControl(
            this.salesBrief.InfluencerNumberOfFollowers.includes('Celebrity')
          ),
        })
      );

      this.newSalesBriefForm.setControl(
        'AudienceAgeRange',
        new FormGroup({
          AgeGroup1: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup1')
          ),
          AgeGroup2: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup2')
          ),
          AgeGroup3: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup3')
          ),
          AgeGroup4: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup4')
          ),
          AgeGroup5: new FormControl(
            this.salesBrief.InfluencerAgeRange.includes('AgeGroup5')
          ),
        })
      );

      this.newSalesBriefForm.patchValue(this.salesBrief);
    });
  }
  navigateToForms() {
    this.router.navigate(['home/sales/forms']);
  }

  processFormGroups(formGroup: any): string {
    const trueValues: string[] = [];

    Object.keys(formGroup.controls).forEach((key) => {
      if (formGroup.get(key).value) {
        trueValues.push(key);
      }
    });
    return trueValues.join(', ');
  }
}
