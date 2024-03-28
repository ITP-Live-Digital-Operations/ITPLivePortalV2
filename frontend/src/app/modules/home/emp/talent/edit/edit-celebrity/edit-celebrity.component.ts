import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CelebrityService } from 'src/app/core/services/celebrity.service';

@Component({
  selector: 'app-edit-celebrity',
  templateUrl: './edit-celebrity.component.html',
  styleUrls: ['./edit-celebrity.component.scss']
})
export class EditCelebrityComponent {

  public editCelebrityForm!: FormGroup;
  private data: any;
  private celebrityData: any
  public isCelebrity: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CelebrityService,
    @Inject(MAT_DIALOG_DATA) public source: any,
    private dialogRef: MatDialogRef<EditCelebrityComponent>,
    private toastrService: ToastrService
  ) {
    this.initializeElements();
    this.GetInfluencerData(this.source.id)
  }

  private initializeElements(): void {
    this.editCelebrityForm = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        Name: ['', [Validators.required]],
        Gender: ['', [Validators.required]],
        Number: [''],
        Email: ['', [Validators.email]],
        MainContentLanguage: [''],
        MainVertical: [''],
        Occupation: [''],
        ItpRelationship: [''],
        Nationality: [''],
        CountryLocation: [''],
        CityLocation: [''],
        Address: [''],
      }),
      socials: this.formBuilder.group({
        InstagramHandle: [''],
        InstagramFollowers: [''],
        InstagramLink: [''],

        TiktokHandle: [''],
        TiktokFollowers: [''],
        TiktokLink: [''],

        SnapchatHandle: [''],
        SnapchatFollowers: [''],
        SnapchatLink: [''],

        TwitterHandle: [''],
        TwitterFollowers: [''],
        TwitterLink: [''],

        FacebookHandle: [''],
        FacebookFollowers: [''],
        FacebookLink: [''],

        YoutubeHandle: [''],
        YoutubeFollowers: [''],
        YoutubeLink: [''],

        TwitchHandle: [''],
        TwitchFollowers: [''],
        TwitchLink: [''],
      }),
      agencyInfo: this.formBuilder.group({
        Agency: [''],
        AgencyContactPerson: [''],
        AgencyNumber: [''],
        AgencyEmail: ['', [Validators.email]],
        PreviouslyWorkedWith: [''],
      }),
      extraInfo: this.formBuilder.group({
        Game: [''],
        PreviousBrands: [''],
        Bio: [''],
        Notes: [''],
        Rating: [''],
      }),
    });
  }
  activeTabIndex: number = 0;
  tabCount: number = 3; 
  nextTab() {
    if (this.activeTabIndex < this.tabCount - 1) {
      this.activeTabIndex++;
    }
  }
  
  prevTab() {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex--;
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  private GetInfluencerData(inputdata: any): void {
    this.service.getCelebrity(inputdata).subscribe((item) => {
      this.celebrityData = item;
      if (this.celebrityData.data != null) {
        this.editCelebrityForm.setValue(
          {
            generalInfo: {
            Name: this.celebrityData.data.Name,
            Gender: this.celebrityData.data.Gender,
            Number: this.celebrityData.data.Number,
            Email: this.celebrityData.data.Email,
            MainContentLanguage: this.celebrityData.data.MainContentLanguage,
            MainVertical: this.celebrityData.data.MainVertical,
            Occupation: this.celebrityData.data.Occupation,
            ItpRelationship: '',
            Nationality: this.celebrityData.data.Nationality,
            CountryLocation: this.celebrityData.data.CountryLocation,
            CityLocation: '',
            Address: '',
            },
            socials: {
            InstagramHandle: this.celebrityData.data.InstagramHandle,
            InstagramFollowers: this.celebrityData.data.InstagramFollowers,
            InstagramLink: this.celebrityData.data.InstagramLink,

            TiktokHandle: this.celebrityData.data.TiktokHandle,
            TiktokFollowers: this.celebrityData.data.TiktokFollowers,
            TiktokLink: this.celebrityData.data.TiktokLink,

            SnapchatHandle: '',
            SnapchatFollowers: '',
            SnapchatLink: '',

            TwitterHandle: this.celebrityData.data.TwitterHandle,
            TwitterFollowers: this.celebrityData.data.TwitterFollowers,
            TwitterLink: this.celebrityData.data.TwitterLink,

            FacebookHandle:'',
            FacebookFollowers: '',
            FacebookLink: '',

            YoutubeHandle: this.celebrityData.data.YoutubeHandle,
            YoutubeFollowers: this.celebrityData.data.YoutubeFollowers,
            YoutubeLink: this.celebrityData.data.YoutubeLink,

            TwitchHandle: this.celebrityData.data.TwitchHandle,
            TwitchFollowers: this.celebrityData.data.TwitchFollowers,
            TwitchLink: this.celebrityData.data.TwitchLink,
            },
            agencyInfo: {
            Agency: this.celebrityData.data.Agency,
            AgencyContactPerson: this.celebrityData.data.AgencyContactPerson,
            AgencyNumber: this.celebrityData.data.AgencyNumber,
            AgencyEmail: this.celebrityData.data.AgencyEmail,
            PreviouslyWorkedWith: this.celebrityData.data.PreviouslyWorkedWith,
            },

            extraInfo: {
            Game: this.celebrityData.data.Game,
            PreviousBrands: this.celebrityData.data.PreviousBrands,
            Bio: this.celebrityData.data.Bio,
            Notes: this.celebrityData.data.Notes,
            Rating: '',
            }
          }
        )
      }
    })
  }

  public onSubmit(): void {
    const formValues = this.processFormGroups(this.editCelebrityForm);

    this.service.updateCelebrity(formValues, this.source.id).subscribe((res) => {
      this.data = res;
      if (this.data.status === 'success') {
        this.dialogRef.close();
        this.toastrService.success('Influencer Edited Successfully!');
      }
      else {
        this.toastrService.error('Error! Please Try Again!');
      }
    });
  }

  private processFormGroups(formGroup: FormGroup): any {
    let valuesObject: { [key: string]: any } = {};

    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup) {
          valuesObject = {
            ...valuesObject,
            ...this.processFormGroups(control),
          };
        } else if (control instanceof FormControl) {
          valuesObject[key] = control.value;
        }
      });
    }

    return valuesObject;
  }
}
