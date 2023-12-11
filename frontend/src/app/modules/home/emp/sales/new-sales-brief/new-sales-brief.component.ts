import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/services/file.service';
import { Observable, map } from 'rxjs';
import { Department } from 'src/app/core/constant/values.constants';
import { ClientService } from 'src/app/core/services/client.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
@Component({
  selector: 'app-new-sales-brief',
  templateUrl: './new-sales-brief.component.html',
  styleUrls: ['./new-sales-brief.component.scss'],
})
export class NewSalesBriefComponent {
  public newForm!: FormGroup;
  public fileFrom!: FormGroup;
  private newBrief: any;
  private userId = this.userService.getID();
  private userName: any;
  public path = PATH;

  private market: string = '';

  private headsOfKSA: number[] = [];
  private headsofUAE: number[] = [23];

  protected clients: any[] = [];

  currentFile?: File;
  progress = 0;
  message = '';

  filesToUpload: File[] = [];

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private router: Router,
    private toastrService: ToastrService,
    private fileService: FileService,
    private campaignService: CampaignService
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
        clientId: ['', [Validators.required]],
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
      //Upload Files
    });
  }

  ngOnInit(): void {
    this.getHeads();
  }

  private getHeads() {
    this.userService.getKSAHeads().subscribe((res) => {
      this.headsOfKSA = res;
    });

    this.userService.getUAEHead().subscribe((res) => {
      if (res.onLeave) {
        this.headsofUAE.push(15);
      }
    });
  }

  public submitForm(): void {
    const itpDepartment = this.newForm.value.departmentDetails.ItpDepartment;

    const formValues = this.processFormGroups(this.newForm);
    formValues.CreatedbyID = this.userService.getID();
    formValues.Ready = false;
    formValues.ResultsViewed = false;

    console.log(formValues.CampaignName);
    this.market = formValues.AudienceLocation.split(',')[0].trim();
    console.log(this.market);

    this.campaignService
      .addCampaign({
        campaignName: formValues.CampaignName,
        market: this.market,
        clientId: formValues.clientId,
        createdBy: this.userService.getID(),
      })
      .subscribe((res) => {
        this.salesService
          .createBrief({ ...formValues, campaignId: res.campaign.id })
          .subscribe((brief) => {
            this.newBrief = brief;

            this.uploadFiles(this.newBrief.id);

            if (itpDepartment == 'Originals' || itpDepartment == 'UAE') {
              // Zineb will be notified usually
              for (let i = 0; i < this.headsofUAE.length; i++) {
                let id = this.headsofUAE[i];
                let input = {
                  message:
                    'New Sales Brief has been created by ' + this.userName.name,
                  link: `${this.path['viewBrief'] + this.newBrief.id}`,
                };
                this.notificationService
                  .createNotification(id, input)
                  .subscribe((notification) => {});
              }
            } else if (itpDepartment == 'KSA' || itpDepartment == 'Gaming') {
              // Rachelle will be notified usually
              for (let i = 0; i < this.headsOfKSA.length; i++) {
                let id = this.headsOfKSA[i];

                let input = {
                  message:
                    'New Sales Brief has been created by ' + this.userName.name,
                  link: `${this.path['viewBrief'] + this.newBrief.id}`,
                };

                this.notificationService
                  .createNotification(id, input)
                  .subscribe(() => {});
              }
            }
          });
      });

    this.toastrService.success('Brief submitted successfully!');
    this.router.navigate([this.path['forms']]);
  }

  private processFormGroups(formGroup: FormGroup): any {
    let valuesObject: { [key: string]: any } = {};

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls)?.forEach((key) => {
        const control = formGroup.get(key);

        if (
          key === 'InfluencerAgeRange' ||
          key === 'AudienceAgeRange' ||
          key === 'InfluencerNumberOfFollowers'
        ) {
          valuesObject[key] = this.processAgeRangeGroup(control as FormGroup);
        } else if (control instanceof FormGroup) {
          valuesObject = {
            ...valuesObject,
            ...this.processFormGroups(control),
          };
        } else if (control instanceof FormControl) {
          if (Array.isArray(control?.value)) {
            const lol = (control?.value)
              .map((item) => item.toString())
              .join(', ');
            valuesObject[key] = lol;
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

  protected transferedFiles(files: File[]): void {
    this.filesToUpload = files;
  }

  protected uploadFiles(briefId: number): void {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.fileService
        .uploadFile(
          this.filesToUpload[i],
          briefId,
          this.userId,
          Department['SALES']
        )
        .subscribe(
          (event: any) => {
            this.toastrService.success(
              this.filesToUpload[i].name + ' uploaded successfully!'
            );
          },
          (err: any) => {
            this.progress = 0;
            this.toastrService.error(
              'Could not upload the file:' + this.filesToUpload[i].name
            );
          }
        );
    }
  }
}
