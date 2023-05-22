import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/core/Services/sales.service';
import { UserService } from 'src/app/core/Services/user.service';
import { campaignobjectives, clientIndustries, currencies, arabCountries } from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { TaskService } from 'src/app/core/Services/task.service';
@Component({
  selector: 'app-view-sent-brief',
  templateUrl: './view-sent-brief.component.html',
  styleUrls: ['./view-sent-brief.component.css']
})
export class ViewSentBriefComponent implements OnInit {
  newSalesBriefForm: FormGroup;
  clientIndustries: string[] = clientIndustries;
  campaignobjectives: string[] = campaignobjectives;
  currencies: string[] = currencies;
  arabCountries: string[] = arabCountries;

  briefId : any;
  briefData : any;
  taskData : any;

  assigned_user : any;
  ngOnInit(): void {
    this.loadSalesBriefData();
  }



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private taskService : TaskService
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
    InfluencerLocation: new FormGroup({
      Algeria: new FormControl(false),
      Bahrain: new FormControl(false),
      Egypt: new FormControl(false),
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
      Egypt: new FormControl(false),
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
      Egypt: new FormControl(false),
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
      Egypt: new FormControl(false),
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

    this.salesService.updateBrief( this.briefId, salesBrief ).subscribe(
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

  loadSalesBriefData() {
    this.activatedRoute.params.subscribe(params => {
      this.briefId = params['id'];

  });
    this.salesService.getSalesBrief(this.briefId).subscribe( (brief) => {
      this.briefData = brief;
      console.log("brief data: ", this.briefData.data);

      if ( this.briefData.data != null){
        this.newSalesBriefForm = this.formBuilder.group({
            Agency : [this.briefData.data.Agency],
            Client : [this.briefData.data.Client],
            ClientIndustry : [this.briefData.data.ClientIndustry],
            CampaignName : [this.briefData.data.CampaignName],
            CampaignOverview : [this.briefData.data.CampaignOverview],
            CampaignObjective : [this.briefData.data.CampaignObjective],
            CampaignObjectiveDetails : [this.briefData.data.CampaignObjectiveDetails],
            NumberofRecommendations   : [this.briefData.data.NumberofRecommendations],
            Currency  : [this.briefData.data.Currency],
            Budget : [this.briefData.data.Budget],
            CampaignStartDate : [this.briefData.data.CampaignStartDate],
            CampaignEndDate : [this.briefData.data.CampaignEndDate],
            CampaignMessagePhaseOne   : [this.briefData.data.CampaignMessagePhaseOne],
            CampaignMessagePhaseTwo  : [this.briefData.data.CampaignMessagePhaseTwo],
            CampaignMessagePhaseThree : [this.briefData.data.CampaignMessagePhaseThree],
            ContentDeliverables : new FormGroup({
              Instagram : new FormControl(this.briefData.data.ContentDeliverables.includes('Instagram')),
              Facebook : new FormControl(this.briefData.data.ContentDeliverables.includes('Facebook')),
              Twitter : new FormControl(this.briefData.data.ContentDeliverables.includes('Twitter')),
              YouTube : new FormControl(this.briefData.data.ContentDeliverables.includes('YouTube')),
              TikTok : new FormControl(this.briefData.data.ContentDeliverables.includes('TikTok')),
              SnapChat : new FormControl(this.briefData.data.ContentDeliverables.includes('SnapChat')),
              Linkedin : new FormControl(this.briefData.data.ContentDeliverables.includes('Linkedin')),
              Twitch  : new FormControl(this.briefData.data.ContentDeliverables.includes('Twitch')),
            }),
            BrandExclusivityDurationinDays  : [this.briefData.data.BrandExclusivityDurationinDays],
            VideoProduction   : [this.briefData.data.VideoProduction],
            VideoEditing  : [this.briefData.data.VideoEditing],
            InfluencerAgeRange : new FormGroup({
              AgeGroup1 : new FormControl(this.briefData.data.InfluencerAgeRange.includes('AgeGroup1')),
              AgeGroup2 : new FormControl(this.briefData.data.InfluencerAgeRange.includes('AgeGroup2')),
              AgeGroup3 : new FormControl(this.briefData.data.InfluencerAgeRange.includes('AgeGroup3')),
              AgeGroup4 : new FormControl(this.briefData.data.InfluencerAgeRange.includes('AgeGroup4')),
              AgeGroup5 : new FormControl(this.briefData.data.InfluencerAgeRange.includes('AgeGroup5')),
            }),
            InfluencerLocation : new FormGroup({
              Algeria : new FormControl(this.briefData.data.InfluencerLocation.includes('Algeria')),
              Bahrain : new FormControl(this.briefData.data.InfluencerLocation.includes('Bahrain')),
              Egypt : new FormControl(this.briefData.data.InfluencerLocation.includes('Eygpt')),
              Iraq : new FormControl(this.briefData.data.InfluencerLocation.includes('Iraq')),
              Jordan : new FormControl(this.briefData.data.InfluencerLocation.includes('Jordan')),
              Kuwait : new FormControl(this.briefData.data.InfluencerLocation.includes('Kuwait')),
              Lebanon : new FormControl(this.briefData.data.InfluencerLocation.includes('Lebanon')),
              Libya : new FormControl(this.briefData.data.InfluencerLocation.includes('Libya')),
              Morocco : new FormControl(this.briefData.data.InfluencerLocation.includes('Morocco')),
              Oman : new FormControl(this.briefData.data.InfluencerLocation.includes('Oman')),
              Qatar : new FormControl(this.briefData.data.InfluencerLocation.includes('Qatar')),
              SaudiArabia : new FormControl(this.briefData.data.InfluencerLocation.includes('SaudiArabia')),
              Syria : new FormControl(this.briefData.data.InfluencerLocation.includes('Syria')),
              Tunisia : new FormControl(this.briefData.data.InfluencerLocation.includes('Tunisia')),
              UAE : new FormControl(this.briefData.data.InfluencerLocation.includes('UAE')),
            }),
            InfluencerNationality : new FormGroup({
              Algeria : new FormControl(this.briefData.data.InfluencerNationality.includes('Algeria')),
              Bahrain : new FormControl(this.briefData.data.InfluencerNationality.includes('Bahrain')),
              Egypt : new FormControl(this.briefData.data.InfluencerNationality.includes('Eygpt')),
              Iraq : new FormControl(this.briefData.data.InfluencerNationality.includes('Iraq')),
              Jordan : new FormControl(this.briefData.data.InfluencerNationality.includes('Jordan')),
              Kuwait : new FormControl(this.briefData.data.InfluencerNationality.includes('Kuwait')),
              Lebanon : new FormControl(this.briefData.data.InfluencerNationality.includes('Lebanon')),
              Libya : new FormControl(this.briefData.data.InfluencerNationality.includes('Libya')),
              Morocco : new FormControl(this.briefData.data.InfluencerNationality.includes('Morocco')),
              Oman : new FormControl(this.briefData.data.InfluencerNationality.includes('Oman')),
              Qatar : new FormControl(this.briefData.data.InfluencerNationality.includes('Qatar')),
              SaudiArabia : new FormControl(this.briefData.data.InfluencerNationality.includes('SaudiArabia')),
              Syria : new FormControl(this.briefData.data.InfluencerNationality.includes('Syria')),
              Tunisia : new FormControl(this.briefData.data.InfluencerNationality.includes('Tunisia')),
              UAE : new FormControl(this.briefData.data.InfluencerNationality.includes('UAE')),
            }),
            InfluencerGender : [this.briefData.data.InfluencerGender],
            SimilarProfileLink : [this.briefData.data.SimilarProfileLink],
            InfluencerInterest : new FormGroup({
              Beauty : new FormControl(this.briefData.data.InfluencerInterest.includes('Beauty')),
              Lifestyle : new FormControl(this.briefData.data.InfluencerInterest.includes('Lifestyle')),
              Sports  : new FormControl(this.briefData.data.InfluencerInterest.includes('Sports')),
              Food  : new FormControl(this.briefData.data.InfluencerInterest.includes('Food')),
              Gaming : new FormControl(this.briefData.data.InfluencerInterest.includes('Gaming')),
              Business : new FormControl(this.briefData.data.InfluencerInterest.includes('Business')),
              Travel  : new FormControl(this.briefData.data.InfluencerInterest.includes('Travel')),
              Comedy : new FormControl(this.briefData.data.InfluencerInterest.includes('Comedy')),
              Celebrities : new FormControl(this.briefData.data.InfluencerInterest.includes('Celebrities')),
              Health : new FormControl(this.briefData.data.InfluencerInterest.includes('Health')),
              Nutrition : new FormControl(this.briefData.data.InfluencerInterest.includes('Nutrition')),
              Bodybuilding : new FormControl(this.briefData.data.InfluencerInterest.includes('Bodybuilding')),
              Humanitarian  : new FormControl(this.briefData.data.InfluencerInterest.includes('Humanitarian')),
              Automotives : new FormControl(this.briefData.data.InfluencerInterest.includes('Automotives')),
              Tech : new FormControl(this.briefData.data.InfluencerInterest.includes('Tech')),
              Furniture : new FormControl(this.briefData.data.InfluencerInterest.includes('Furniture')),
              Shopping  : new FormControl(this.briefData.data.InfluencerInterest.includes('Shopping')),
              NGO : new FormControl(this.briefData.data.InfluencerInterest.includes('NGO')),
            }),
            InfluencerNumberOfFollowers : new FormGroup({
              Nano : new FormControl(this.briefData.data.InfluencerNumberOfFollowers.includes('Nano')),
              Micro : new FormControl(this.briefData.data.InfluencerNumberOfFollowers.includes('Micro')),
              Macro : new FormControl(this.briefData.data.InfluencerNumberOfFollowers.includes('Macro')),
              Mega : new FormControl(this.briefData.data.InfluencerNumberOfFollowers.includes('Mega')),
              Celebrity : new FormControl(this.briefData.data.InfluencerNumberOfFollowers.includes('Celebrity')),
            }),
            NoteForNumberOfFollowers : [this.briefData.data.NoteForNumberOfFollowers],
            AudienceAgeRange  : new FormGroup({
                AgeGroup1: new FormControl(this.briefData.data.AudienceAgeRange.includes('AgeGroup1')),
                AgeGroup2: new FormControl(this.briefData.data.AudienceAgeRange.includes('AgeGroup2')),
                AgeGroup3: new FormControl(this.briefData.data.AudienceAgeRange.includes('AgeGroup3')),
                AgeGroup4: new FormControl(this.briefData.data.AudienceAgeRange.includes('AgeGroup4')),
                AgeGroup5: new FormControl(this.briefData.data.AudienceAgeRange.includes('AgeGroup5')),
            }),
            AudienceLocation : new FormGroup({
              Algeria : new FormControl(this.briefData.data.AudienceLocation.includes('Algeria')),
              Bahrain : new FormControl(this.briefData.data.AudienceLocation.includes('Bahrain')),
              Egypt : new FormControl(this.briefData.data.AudienceLocation.includes('Eygpt')),
              Iraq : new FormControl(this.briefData.data.AudienceLocation.includes('Iraq')),
              Jordan : new FormControl(this.briefData.data.AudienceLocation.includes('Jordan')),
              Kuwait : new FormControl(this.briefData.data.AudienceLocation.includes('Kuwait')),
              Lebanon : new FormControl(this.briefData.data.AudienceLocation.includes('Lebanon')),
              Libya : new FormControl(this.briefData.data.AudienceLocation.includes('Libya')),
              Morocco : new FormControl(this.briefData.data.AudienceLocation.includes('Morocco')),
              Oman : new FormControl(this.briefData.data.AudienceLocation.includes('Oman')),
              Qatar : new FormControl(this.briefData.data.AudienceLocation.includes('Qatar')),
              SaudiArabia : new FormControl(this.briefData.data.AudienceLocation.includes('SaudiArabia')),
              Syria : new FormControl(this.briefData.data.AudienceLocation.includes('Syria')),
              Tunisia : new FormControl(this.briefData.data.AudienceLocation.includes('Tunisia')),
              UAE : new FormControl(this.briefData.data.AudienceLocation.includes('UAE')),
            }),
            AudienceNationality : new FormGroup({
              Algeria : new FormControl(this.briefData.data.AudienceNationality.includes('Algeria')),
              Bahrain : new FormControl(this.briefData.data.AudienceNationality.includes('Bahrain')),
              Egypt : new FormControl(this.briefData.data.AudienceNationality.includes('Eygpt')),
              Iraq : new FormControl(this.briefData.data.AudienceNationality.includes('Iraq')),
              Jordan : new FormControl(this.briefData.data.AudienceNationality.includes('Jordan')),
              Kuwait : new FormControl(this.briefData.data.AudienceNationality.includes('Kuwait')),
              Lebanon : new FormControl(this.briefData.data.AudienceNationality.includes('Lebanon')),
              Libya : new FormControl(this.briefData.data.AudienceNationality.includes('Libya')),
              Morocco : new FormControl(this.briefData.data.AudienceNationality.includes('Morocco')),
              Oman : new FormControl(this.briefData.data.AudienceNationality.includes('Oman')),
              Qatar : new FormControl(this.briefData.data.AudienceNationality.includes('Qatar')),
              SaudiArabia : new FormControl(this.briefData.data.AudienceNationality.includes('SaudiArabia')),
              Syria : new FormControl(this.briefData.data.AudienceNationality.includes('Syria')),
              Tunisia : new FormControl(this.briefData.data.AudienceNationality.includes('Tunisia')),
              UAE : new FormControl(this.briefData.data.AudienceNationality.includes('UAE')),
            }),
            AudienceGender : [this.briefData.data.AudienceGender],
            AudienceInterest : new FormGroup({
              Beauty : new FormControl(this.briefData.data.AudienceInterest.includes('Beauty')),
              Lifestyle : new FormControl(this.briefData.data.AudienceInterest.includes('Lifestyle')),
              Sports : new FormControl(this.briefData.data.AudienceInterest.includes('Sports')),
              Food : new FormControl(this.briefData.data.AudienceInterest.includes('Food')),
              Gaming : new FormControl(this.briefData.data.AudienceInterest.includes('Gaming')),
              Business : new FormControl(this.briefData.data.AudienceInterest.includes('Business')),
              Travel : new FormControl(this.briefData.data.AudienceInterest.includes('Travel')),
              Comedy : new FormControl(this.briefData.data.AudienceInterest.includes('Comedy')),
              Celebrities : new FormControl(this.briefData.data.AudienceInterest.includes('Celebrities')),
              Health : new FormControl(this.briefData.data.AudienceInterest.includes('Health')),
              Nutrition : new FormControl(this.briefData.data.AudienceInterest.includes('Nutrition')),
              Bodybuilding : new FormControl(this.briefData.data.AudienceInterest.includes('Bodybuilding')),
              Humanitarian : new FormControl(this.briefData.data.AudienceInterest.includes('Humanitarian')),
              Automotives : new FormControl(this.briefData.data.AudienceInterest.includes('Automotives')),
              Tech : new FormControl(this.briefData.data.AudienceInterest.includes('Tech')),
              Furniture : new FormControl(this.briefData.data.AudienceInterest.includes('Furniture')),
              Shopping : new FormControl(this.briefData.data.AudienceInterest.includes('Shopping')),
              NGO : new FormControl(this.briefData.data.AudienceInterest.includes('NGO')),
            }),
            ConfirmedInfluencerHandles : [this.briefData.data.ConfirmedInfluencerHandles],
            PreviousBrandAmbassadorsName : [this.briefData.data.PreviousBrandAmbassadorsName],

          });
          if( this.briefData.data.assigned){
              this.taskService.getTaskByBriefId(this.briefId).subscribe((task: any) => {


                this.taskData = task;


                this.userService.getUserByID(this.taskData.data[0].assigned_to).subscribe((user: any) => {


                  this.assigned_user = user;
                })
              })

            }


      }
    })

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
