import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-sales-brief',
  templateUrl: './new-sales-brief.component.html',
  styleUrls: ['./new-sales-brief.component.scss'],
})

export class NewSalesBriefComponent {

  public newForm!: FormGroup;
  private newBrief: any;
  private userId = this.userService.getID();
  private userName: any;
  public path = PATH;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.userService.getUserNameById(this.userId).subscribe((res) => {
      this.userName = res;
    });

    this.initializeElements();
  }

  private initializeElements(): void {
    this.newForm = this.formBuilder.group({
      //BASIC INFORMATION
      basicInfo: this.formBuilder.group({
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
      }),
      //CAMPAIGN OVERVIEW
      campaignOverview: this.formBuilder.group({
        CampaignStartDate: ['', [Validators.required]],
        CampaignEndDate: ['', [Validators.required]],
        CampaignMessagePhaseOne: [''],
        CampaignMessagePhaseTwo: [''],
        CampaignMessagePhaseThree: [''],
        ContentDeliverables: [''],
        BrandExclusivityDurationinDays: ['', [Validators.required]],
        VideoProduction: new FormControl(false),
        VideoEditing: new FormControl(false),
      }),
      //INFLUENCER DETAILS
      influencerDetails: this.formBuilder.group({
        InfluencerAgeRange: new FormGroup({
          AgeGroup1: new FormControl(false),
          AgeGroup2: new FormControl(false),
          AgeGroup3: new FormControl(false),
          AgeGroup4: new FormControl(false),
          AgeGroup5: new FormControl(false),
        }),
        InfluencerLocation: [''],
        InfluencerCity: [''],
        InfluencerNationality: [''],
        InfluencerGender: [''],
        InfluencerNotes: [''],
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
      }),
      //AUDIENCE DETAILS
      audienceDetails: this.formBuilder.group({
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
      }),
      //DEPARTMENT DETAILS
      departmentDetails: this.formBuilder.group({
        ConfirmedInfluencerHandles: [''],
        PreviousBrandAmbassadorsName: [''],
        Performance: new FormControl(false),
        Event: new FormControl(false),
        Concept: new FormControl(false),
        Strategy: new FormControl(false),
        ItpDepartment: ['', [Validators.required]],
        KPIs: [''],
      }),
    });
  }

  public submitForm(): void {
    const itpDepartment = this.newForm.value.departmentDetails.ItpDepartment;

    const formValues = this.processFormGroups(this.newForm);
    formValues.CreatedbyID = this.userService.getID();
    formValues.Ready = false;
    formValues.ResultsViewed = false;
    console.log(formValues);

    this.salesService.createBrief({ ...formValues }).subscribe((brief) => {
      this.newBrief = brief;
      if (itpDepartment == 'Originals' || itpDepartment == 'UAE') {
        let id = 23;
        let input = {
          message: 'New Sales Brief has been created by ' + this.userName.name,
          link: `${this.path['viewBrief'] + this.newBrief.id}`,
        };
        this.notificationService
          .createNotification(id, input)
          .subscribe((notification) => {});
      } else if (itpDepartment == 'KSA' || itpDepartment == 'Gaming') {
        let id = 15;
        let input = {
          message: 'New Sales Brief has been created by ' + this.userName.name,
          link: `${this.path['viewBrief'] + this.newBrief.id}`,
        };

        this.notificationService
          .createNotification(id, input)
          .subscribe(() => {});
      }
    });
    this.toastrService.success('Brief submitted successfully!');
    this.router.navigate([this.path['forms']]);
  }

  private processFormGroups(formGroup: FormGroup): any {
    let valuesObject: { [key: string]: any } = {};

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls)?.forEach((key) => {
        const control = formGroup.get(key);
        console.log(control?.value)

        if (key === 'InfluencerAgeRange' || key === 'AudienceAgeRange') {
          valuesObject[key] = this.processAgeRangeGroup(control as FormGroup);
        } else if (control instanceof FormGroup) {
          valuesObject = {
            ...valuesObject,
            ...this.processFormGroups(control),
          };
        } else if (control instanceof FormControl) {
          if (Array.isArray(control?.value)){
            const lol = (control?.value).map(item => item.toString()).join(', ');
            valuesObject[key] = lol
          } else {
          valuesObject[key] = control?.value;
          }
        } 
      });
    }
    return valuesObject;
  }

  private processAgeRangeGroup(group: FormGroup): string {
    const ageGroups = Object.keys(group.controls)
      .filter((ageGroupKey) => group.get(ageGroupKey)?.value === true)
      .join(', ');
    return ageGroups;
  }
}
