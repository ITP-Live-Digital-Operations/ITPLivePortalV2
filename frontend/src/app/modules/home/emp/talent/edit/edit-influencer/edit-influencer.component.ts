import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Component({
  selector: 'app-edit-influencer',
  templateUrl: './edit-influencer.component.html',
  styleUrls: ['./edit-influencer.component.scss']
})
export class EditInfluencerComponent {

  public editInfluencerForm!: FormGroup;
  private influencerData: any;
  private data: any;
  public isNotCelebrity: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: InfluencerService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public source: any,
    private dialogRef: MatDialogRef<EditInfluencerComponent>,
  ) {
    this.initializeElements();
    this.GetInfluencerData(this.source.id);
  }

  private initializeElements(): void {
    this.editInfluencerForm = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        Name: ['', [Validators.required]],
        Gender: ['', [Validators.required]],
        Number: [''],
        Email: ['', [Validators.email]],
        MainContentLanguage: [''],
        SubContentLang: [''],
        MainVertical: [''],
        SubVertical: [''],
        Occupation: [''],
        ItpRelationship: [''],
        Nationality: [''],
        SecondNationality: [''],
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

      KSALicense: [''],
      UAELicense: [''],
      agencyInfo: this.formBuilder.group({
        AgencyContactPerson: [''],
        AgencyNumber: [''],
        AgencyEmail: ['', [Validators.email]],
      }),
      extraInfo: this.formBuilder.group({
        PreviousBrands: [''],
        Bio: [''],
        Notes: [''],
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
    this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
      if (this.influencerData.data != null) {
        this.editInfluencerForm.setValue(
          {
            generalInfo: {
            Name: this.influencerData.data.Name,
            Gender: this.influencerData.data.Gender,
            Number: this.influencerData.data.Number,
            Email: this.influencerData.data.Email,
            MainContentLanguage: this.influencerData.data.MainContentLanguage,
            SubContentLang: this.influencerData.data.SubContentLang,
            MainVertical: this.influencerData.data.MainVertical,
            SubVertical: this.influencerData.data.SubVertical,
            Occupation: this.influencerData.data.Occupation,
            ItpRelationship: this.influencerData.data.ItpRelationship,
            Nationality: this.influencerData.data.Nationality,
            SecondNationality: this.influencerData.data.SecondNationality,
            CountryLocation: this.influencerData.data.CountryLocation,
            CityLocation: this.influencerData.data.CityLocation,
            Address: this.influencerData.data.Address,
            },
            socials: {
            InstagramHandle: this.influencerData.data.InstagramHandle,
            InstagramFollowers: this.influencerData.data.InstagramFollowers,
            InstagramLink: this.influencerData.data.InstagramLink,

            TiktokHandle: this.influencerData.data.TiktokHandle,
            TiktokFollowers: this.influencerData.data.TiktokFollowers,
            TiktokLink: this.influencerData.data.TiktokLink,

            SnapchatHandle: this.influencerData.data.SnapchatHandle,
            SnapchatFollowers: this.influencerData.data.SnapchatFollowers,
            SnapchatLink: this.influencerData.data.SnapchatLink,

            TwitterHandle: this.influencerData.data.TwitterHandle,
            TwitterFollowers: this.influencerData.data.TwitterFollowers,
            TwitterLink: this.influencerData.data.TwitterLink,

            FacebookHandle:this.influencerData.data.FacebookHandle,
            FacebookFollowers: this.influencerData.data.FacebookFollowers,
            FacebookLink: this.influencerData.data.FacebookLink,

            YoutubeHandle: this.influencerData.data.YoutubeHandle,
            YoutubeFollowers: this.influencerData.data.YoutubeFollowers,
            YoutubeLink: this.influencerData.data.YoutubeLink,

            TwitchHandle: this.influencerData.data.TwitchHandle,
            TwitchFollowers: this.influencerData.data.TwitchFollowers,
            TwitchLink: this.influencerData.data.TwitchLink,
            },

            KSALicense: this.influencerData.data.KSALicense,
            UAELicense: this.influencerData.data.UAELicense,

            agencyInfo: {
            AgencyContactPerson: this.influencerData.data.AgencyContactPerson,
            AgencyNumber: this.influencerData.data.AgencyNumber,
            AgencyEmail: this.influencerData.data.AgencyEmail,
            },

            extraInfo: {
            PreviousBrands: this.influencerData.data.PreviousBrands,
            Bio: this.influencerData.data.Bio,
            Notes: this.influencerData.data.Notes,
            }
          }
        )
      }
    })
  }

  public onSubmit(): void {
    const formValues = this.processFormGroups(this.editInfluencerForm);
    this.service.updateInfluencer( formValues, this.source.id ).subscribe((res) => {
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
          valuesObject = { ...valuesObject, ...this.processFormGroups(control) };
        } else if (control instanceof FormControl) {
          valuesObject[key] = control.value;
        }
      });
    }

    return valuesObject;
}
}
