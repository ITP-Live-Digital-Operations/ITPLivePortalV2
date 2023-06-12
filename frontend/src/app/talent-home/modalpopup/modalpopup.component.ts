import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { genders, languages, verticals, countries , nationalities, itprelatioship} from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {
  updateInfluencerForm: FormGroup;
  data: any;

  genders = genders;
  languages = languages;
  verticals = verticals;
  countries = countries;
  nationalities = nationalities;
  itprelatioship = itprelatioship
  influencerData: any;

  constructor(private formBuilder: FormBuilder, private service: InfluencerService, private route: Router, @Inject(MAT_DIALOG_DATA) public source: any, private dialogRef: MatDialogRef<ModalpopupComponent>) {
    this.updateInfluencerForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Number: ['',],
      Email: [''],
      MainContentLanguage: ['',],
      SubContentLang: ['',],
      MainVertical: ['',],
      SubVertical: ['',],
      Occupation: ['',],
      ItpRelationship: ['',],
      Nationality: ['',],
      SecondNationality: ['',],
      CountryLocation: ['',],
      CityLocation: ['',],
      Address: ['',],

      InstagramHandle: ['', [Validators.required]],
      InstagramFollowers: ['',],
      InstagramLink: ['',],

      TiktokHandle: ['',],
      TiktokFollowers: ['',],
      TiktokLink: ['',],

      SnapchatHandle: ['',],
      SnapchatFollowers: ['',],
      SnapchatLink: ['',],

      TwitterHandle: ['',],
      TwitterFollowers: ['',],
      TwitterLink: ['',],

      FacebookHandle: ['',],
      FacebookFollowers: ['',],
      FacebookLink: ['',],

      YoutubeHandle: ['',],
      YoutubeFollowers: ['',],
      YoutubeLink: ['',],

      AudienceMalePer: ['',],
      AudienceFemalePer: ['',],

      AgeGroup1317: ['',],
      AgeGroup1824: ['',],
      AgeGroup2534: ['',],
      AgeGroup3544: ['',],
      AgeGroup4554: ['',],
      AgeGroup55: ['',],

      AudienceTopCountries1: ['',],
      AudienceTopCountries1Percentage: ['',],

      AudienceTopCountries2: ['',],
      AudienceTopCountries2Percentage: ['',],

      AudienceTopCountries3: ['',],
      AudienceTopCountries3Percentage: ['',],

      KSALicense: ['',],
      UAELicense: ['',],

      AgencyContactPerson: ['',],
      AgencyNumber: ['',],
      AgencyEmail: ['', [Validators.email]],

      PreviousBrands: ['',],
      Bio: ['',],
      Notes: ['',],
    })

  }


  ngOnInit() {
    this.GetInfluencerData(this.source.id);
  }

  GetInfluencerData(inputdata: any) {
    return this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
      /* console.log(this.influencerData.data); */

      if (this.influencerData.data != null) {
        this.updateInfluencerForm.setValue(
          {
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

            AudienceMalePer: this.influencerData.data.AudienceMalePer,
            AudienceFemalePer: this.influencerData.data.AudienceFemalePer,

            AgeGroup1317: this.influencerData.data.AgeGroup1317,
            AgeGroup1824: this.influencerData.data.AgeGroup1824,
            AgeGroup2534: this.influencerData.data.AgeGroup2534,
            AgeGroup3544: this.influencerData.data.AgeGroup3544,
            AgeGroup4554: this.influencerData.data.AgeGroup4554,
            AgeGroup55: this.influencerData.data.AgeGroup55,

            AudienceTopCountries1: this.influencerData.data.AudienceTopCountries1,
            AudienceTopCountries1Percentage: this.influencerData.data.AudienceTopCountries1Percentage,

            AudienceTopCountries2: this.influencerData.data.AudienceTopCountries2,
            AudienceTopCountries2Percentage: this.influencerData.data.AudienceTopCountries2Percentage,

            AudienceTopCountries3: this.influencerData.data.AudienceTopCountries3,
            AudienceTopCountries3Percentage: this.influencerData.data.AudienceTopCountries3Percentage,

            KSALicense: this.influencerData.data.KSALicense,
            UAELicense: this.influencerData.data.UAELicense,

            AgencyContactPerson: this.influencerData.data.AgencyContactPerson,
            AgencyNumber: this.influencerData.data.AgencyNumber,
            AgencyEmail: this.influencerData.data.AgencyEmail,

            PreviousBrands: this.influencerData.data.PreviousBrands,
            Bio: this.influencerData.data.Bio,
            Notes: this.influencerData.data.Notes,

          }
        )
      }
    })
  }

  backButton() {
    window.history.back();
  }

  onSubmit() {
    console.log(this.source);


    this.service.updateInfluencer(this.updateInfluencerForm.value, this.source.id).subscribe((res) => {

      this.data = res;
      if (this.data.status === "success") {
        alertify.success("Influencer updated successfully.")
        this.dialogRef.close();
        this.route.navigate([`home/talent/influencers`])
      }
      else {
        alertify.error("Influencer was not updated");
      }

    })
  }
}
