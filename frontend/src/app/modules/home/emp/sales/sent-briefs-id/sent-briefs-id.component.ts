import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/services/file.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { Department } from 'src/app/core/constant/values.constants';

@Component({
  selector: 'app-sent-briefs-id',
  templateUrl: './sent-briefs-id.component.html',
  styleUrls: ['./sent-briefs-id.component.scss'],
})

export class SentBriefsIdComponent {

  public editForm!: FormGroup;
  public path = PATH;

  private briefId: any;
  private briefData: any;
  public newBrief: any;
  private taskData: any;
  brand : any;

  public userId = this.userService.getID();
  public userName: any;
  private assignedUser: any;

  filesToUpload : File[] = []
  dataSource: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private salesService: SalesService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private toastrService: ToastrService,
    private fileService: FileService,
    private dialogService: ConfirmationDialogService,
  ) {
    this.userService.getUserNameById(this.userId).subscribe((res) => {
      this.userName = res;
    });

    this.loadSalesBriefData();

    this.initializeElements();

    this.getSalesFiles();
  }
  
  private initializeElements(): void {
    this.editForm = this.formBuilder.group({
      //BASIC INFORMATION
      basicInfo: this.formBuilder.group({
        Agency: ['', [Validators.required]],
        clientId: ['', [Validators.required]],
        brandId: [''],
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

  private loadSalesBriefData(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.briefId = params['id'];
    });

    this.salesService.getSalesBrief(this.briefId).subscribe((brief) => {
      this.briefData = brief;
      console.log(this.briefData.data)

      if( this.briefData.data.assigned ){
        this.taskService.getTaskByBriefId(this.briefId).subscribe( (task) => {
          this.taskData = task;


        })
      }

      const FetchedAgeGroups = this.briefData.data.InfluencerAgeRange?.split(',').map((value: string) => value.trim())
      const influencerAgeRange = this.editForm.get('influencerDetails.InfluencerAgeRange') as FormGroup;

      FetchedAgeGroups?.forEach((ageGroup: string) => {
        influencerAgeRange.get(ageGroup)?.setValue(true);
      });

      const fetchedAgeGroups = this.briefData.data.AudienceAgeRange?.split(',').map((value: string) => value.trim())
      const audienceAgeRange = this.editForm.get('audienceDetails.AudienceAgeRange') as FormGroup;

      fetchedAgeGroups?.forEach((ageGroup: string) => {
        audienceAgeRange.get(ageGroup)?.setValue(true);
      });

      const AFetchedAgeGroups = this.briefData.data.InfluencerNumberOfFollowers?.split(',').map((value: string) => value.trim())
      const numberOfFollowers = this.editForm.get('influencerDetails.InfluencerNumberOfFollowers') as FormGroup;

      AFetchedAgeGroups?.forEach((ageGroup: string) => {
        numberOfFollowers.get(ageGroup)?.setValue(true);
      });
      console.log('Data to patch:', this.briefData.data.Agency);

      if (this.briefData.data != null) {
        this.brand = this.briefData.data.brand;
        this.editForm.patchValue({
          basicInfo: {
            Agency: this.briefData.data.Agency,
            clientId: this.briefData.data.clientId,
            brandId:  this.briefData.data.brandId,
            CampaignName: this.briefData.data.CampaignName,
            CampaignOverview: this.briefData.data.CampaignOverview,
            CampaignObjective: this.briefData.data.CampaignObjective,
            CampaignObjectiveDetails:
              this.briefData.data.CampaignObjectiveDetails,
            NumberofRecommendations:
              this.briefData.data.NumberofRecommendations,
            Currency: this.briefData.data.Currency,
            Budget: this.briefData.data.Budget,
          },
          campaignOverview: {
            CampaignStartDate: this.briefData.data.CampaignStartDate,
            CampaignEndDate: this.briefData.data.CampaignEndDate,
            CampaignMessagePhaseOne:
              this.briefData.data.CampaignMessagePhaseOne,
            CampaignMessagePhaseTwo:
              this.briefData.data.CampaignMessagePhaseTwo,
            CampaignMessagePhaseThree:
              this.briefData.data.CampaignMessagePhaseThree,
            ContentDeliverables: this.briefData.data.ContentDeliverables?.split(',').map((value: string) => value.trim()),
            BrandExclusivityDurationinDays:
              this.briefData.data.BrandExclusivityDurationinDays,
            VideoProduction: this.briefData.data.VideoProduction,
            VideoEditing: this.briefData.data.VideoEditing,
          },
          influencerDetails: {
            InfluencerAgeRange: this.briefData.data.InfluencerAgeRange,
            InfluencerLocation: this.briefData.data.InfluencerLocation?.split(',').map((value: string) => value.trim()),
            InfluencerCity: this.briefData.data.InfluencerCity,
            InfluencerNationality: this.briefData.data.InfluencerNationality?.split(',').map((value: string) => value.trim()),
            InfluencerGender: this.briefData.data.InfluencerGender,
            InfluencerNotes: this.briefData.data.InfluencerNotes,
            SimilarProfileLink: this.briefData.data.SimilarProfileLink,
            InfluencerInterest: this.briefData.data.InfluencerInterest?.split(',').map((value: string) => value.trim()),
            InfluencerNumberOfFollowers: this.briefData.data.InfluencerNumberOfFollowers,
            NoteForNumberOfFollowers:
              this.briefData.data.NoteForNumberOfFollowers,
          },
          audienceDetails: {
            AudienceAgeRange: this.briefData.data.AudienceAgeRange,
            AudienceLocation: this.briefData.data.AudienceLocation?.split(',').map((value: string) => value.trim()),
            AudienceNationality: this.briefData.data.AudienceNationality?.split(',').map((value: string) => value.trim()),
            AudienceGender: this.briefData.data.AudienceGender,
            PrimaryAudienceInterest:
              this.briefData.data.PrimaryAudienceInterest?.split(',').map((value: string) => value.trim()),
            SecondaryAudienceInterest:
              this.briefData.data.SecondaryAudienceInterest?.split(',').map((value: string) => value.trim()),
          },
          departmentDetails: {
            ConfirmedInfluencerHandles:
              this.briefData.data.ConfirmedInfluencerHandles,
            PreviousBrandAmbassadorsName:
              this.briefData.data.PreviousBrandAmbassadorsName,
            Performance: this.briefData.data.Performance,
            Event: this.briefData.data.Event,
            Concept: this.briefData.data.Concept,
            Strategy: this.briefData.data.Strategy,
            ItpDepartment: this.briefData.data.ItpDepartment,
            KPIs: this.briefData.data.KPIs,
          },
        });
      }
      console.log('test', this.editForm.value);

    });

  }

  public submitForm(): void {
    const itpDepartment = this.editForm.value.departmentDetails.ItpDepartment;
    const formValues = this.processFormGroups(this.editForm);
    formValues.CreatedbyID = this.userService.getID();
    formValues.Ready = false;
    formValues.ResultsViewed = false;

    this.salesService.updateBrief(this.briefId, formValues).subscribe(
      (briefid) => {

        this.uploadFiles(this.briefId);

        if(itpDepartment == 'Originals' || itpDepartment == 'UAE'){
          let id = 23;
          let input = { message : 'Sales Brief ' + formValues.CampaignName + ' has been edited', link: `${this.path['viewBrief'] + this.briefId}`}

          this.notificationService.createNotification( id, input).subscribe( () => {})

          if(this.assignedUser != null){
            let input1 = { message : 'Sales Brief ' + formValues.CampaignName + ' has been edited', link: `${this.path['viewBrief'] + this.briefId}`}
            this.notificationService.createNotification( this.assignedUser.id, input1).subscribe( () => {})
          }
        }
        else if(itpDepartment == 'KSA' || itpDepartment == 'Gaming' ){
          let id = 15;
          let input = { message : 'Sales Brief ' + formValues.CampaignName + ' has been edited', link: `${this.path['viewBrief'] + this.briefId}`}

          this.notificationService.createNotification( id, input).subscribe( () => {})

          if(this.assignedUser != null){
            let input2 = { message : 'Sales Brief ' + formValues.CampaignName + ' has been edited', link: `${this.path['viewBrief'] + this.briefId}`}
            this.notificationService.createNotification( this.assignedUser.id, input2).subscribe( () => {})
          }
        }
        this.toastrService.success('Sales brief edited successfully');
        this.router.navigate([this.path['forms']]);
      },
      (error) => {
        this.toastrService.error('An error occurred while creating the sales brief');
      }
    );
  }

  private processFormGroups(formGroup: FormGroup): any {
    let valuesObject: { [key: string]: any } = {};

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls)?.forEach((key) => {
        const control = formGroup.get(key);
        console.log(control?.value)

        if (key === 'InfluencerAgeRange' || key === 'AudienceAgeRange' || key === 'InfluencerNumberOfFollowers') {
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



  displayedColumns: string[] = [
    'id',
    'originalname',
    'fileType',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  private getSalesFiles() {
    this.fileService.getSalesBriefFiles(this.briefId).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

   protected deleteFile(id: number): void {
    this.dialogService.openConfirmationDialog('Confirm!', 'Are you sure you want to delete?')
      .subscribe(result => {
        if (result === true) {
            this.fileService.deleteFile(id).subscribe(() => {
              this.toastrService.success('File deleted successfully!');
              this.getSalesFiles();
            });
          }
        });
   }

   transferedFiles(files: File[]): void {
    this.filesToUpload = files;
  }

  uploadFiles(briefId : number): void {
    for(let i = 0; i < this.filesToUpload.length; i++){
      this.fileService.uploadFile(this.filesToUpload[i], briefId , this.userId, Department['SALES']).subscribe(
        (event: any) => {
          console.log(event);
            this.toastrService.success(this.filesToUpload[i].name+ ' uploaded successfully!');
      },
      (err: any) => {
        console.log(err);

        this.toastrService.error('Could not upload the file:' + this.filesToUpload[i].name);
      }
        );
    }
  }
}
