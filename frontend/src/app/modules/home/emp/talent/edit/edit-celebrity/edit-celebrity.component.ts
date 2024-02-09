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
        InstagramHandle: ['', [Validators.required]],
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
        PreviousBrands: [''],
        Bio: [''],
        Notes: [''],
        Rating: [''],
      }),
    });
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
            ItpRelationship: this.celebrityData.data.ItpRelationship,
            Nationality: this.celebrityData.data.Nationality,
            CountryLocation: this.celebrityData.data.CountryLocation,
            CityLocation: this.celebrityData.data.CityLocation,
            Address: this.celebrityData.data.Address,
            },
            socials: {
            InstagramHandle: this.celebrityData.data.InstagramHandle,
            InstagramFollowers: this.celebrityData.data.InstagramFollowers,
            InstagramLink: this.celebrityData.data.InstagramLink,

            TiktokHandle: this.celebrityData.data.TiktokHandle,
            TiktokFollowers: this.celebrityData.data.TiktokFollowers,
            TiktokLink: this.celebrityData.data.TiktokLink,

            SnapchatHandle: this.celebrityData.data.SnapchatHandle,
            SnapchatFollowers: this.celebrityData.data.SnapchatFollowers,
            SnapchatLink: this.celebrityData.data.SnapchatLink,

            TwitterHandle: this.celebrityData.data.TwitterHandle,
            TwitterFollowers: this.celebrityData.data.TwitterFollowers,
            TwitterLink: this.celebrityData.data.TwitterLink,

            FacebookHandle:this.celebrityData.data.FacebookHandle,
            FacebookFollowers: this.celebrityData.data.FacebookFollowers,
            FacebookLink: this.celebrityData.data.FacebookLink,

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
            PreviousBrands: this.celebrityData.data.PreviousBrands,
            Bio: this.celebrityData.data.Bio,
            Notes: this.celebrityData.data.Notes,
            Rating: this.celebrityData.data.Rating,
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
