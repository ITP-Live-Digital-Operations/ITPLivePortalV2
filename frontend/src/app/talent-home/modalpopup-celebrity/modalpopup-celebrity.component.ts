import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { genders, languages, verticals, countries , nationalities} from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CelebrityService } from 'src/app/core/Services/celebrity.service';

@Component({
  selector: 'app-modalpopup-celebrity',
  templateUrl: './modalpopup-celebrity.component.html',
  styleUrls: ['./modalpopup-celebrity.component.css']
})
export class ModalpopupCelebrityComponent implements OnInit{
  updateCelebrityForm: FormGroup;
  data: any;

  genders = genders;
  languages = languages;
  verticals = verticals;
  countries = countries;
  nationalities = nationalities;
  celebrityData: any;

  constructor(private formBuilder: FormBuilder, private service: CelebrityService, private route: Router, @Inject(MAT_DIALOG_DATA) public source: any, private dialogRef: MatDialogRef<ModalpopupCelebrityComponent>) {
    this.updateCelebrityForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Number: ['',],
      Email: ['', [Validators.email]],
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
    this.GetCelebrityData(this.source.id);
  }

  GetCelebrityData(inputdata: any) {
    return this.service.getCelebrity(inputdata).subscribe((item) => {
      this.celebrityData = item;
      /* console.log(this.celebrityData.data); */

      if (this.celebrityData.data != null) {
        this.updateCelebrityForm.setValue(
          {
            Name: this.celebrityData.data.Name,
            Gender: this.celebrityData.data.Gender,
            Number: this.celebrityData.data.Number,
            Email: this.celebrityData.data.Email,
            MainContentLanguage: this.celebrityData.data.MainContentLanguage,
            SubContentLang: this.celebrityData.data.SubContentLang,
            MainVertical: this.celebrityData.data.MainVertical,
            SubVertical: this.celebrityData.data.SubVertical,
            Occupation: this.celebrityData.data.Occupation,
            ItpRelationship: this.celebrityData.data.ItpRelationship,
            Nationality: this.celebrityData.data.Nationality,
            SecondNationality: this.celebrityData.data.SecondNationality,
            CountryLocation: this.celebrityData.data.CountryLocation,
            CityLocation: this.celebrityData.data.CityLocation,
            Address: this.celebrityData.data.Address,

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

            AudienceMalePer: this.celebrityData.data.AudienceMalePer,
            AudienceFemalePer: this.celebrityData.data.AudienceFemalePer,

            AgeGroup1317: this.celebrityData.data.AgeGroup1317,
            AgeGroup1824: this.celebrityData.data.AgeGroup1824,
            AgeGroup2534: this.celebrityData.data.AgeGroup2534,
            AgeGroup3544: this.celebrityData.data.AgeGroup3544,
            AgeGroup4554: this.celebrityData.data.AgeGroup4554,
            AgeGroup55: this.celebrityData.data.AgeGroup55,

            AudienceTopCountries1: this.celebrityData.data.AudienceTopCountries1,
            AudienceTopCountries1Percentage: this.celebrityData.data.AudienceTopCountries1Percentage,

            AudienceTopCountries2: this.celebrityData.data.AudienceTopCountries2,
            AudienceTopCountries2Percentage: this.celebrityData.data.AudienceTopCountries2Percentage,

            AudienceTopCountries3: this.celebrityData.data.AudienceTopCountries3,
            AudienceTopCountries3Percentage: this.celebrityData.data.AudienceTopCountries3Percentage,

            KSALicense: this.celebrityData.data.KSALicense,
            UAELicense: this.celebrityData.data.UAELicense,

            AgencyContactPerson: this.celebrityData.data.AgencyContactPerson,
            AgencyNumber: this.celebrityData.data.AgencyNumber,
            AgencyEmail: this.celebrityData.data.AgencyEmail,

            PreviousBrands: this.celebrityData.data.PreviousBrands,
            Bio: this.celebrityData.data.Bio,
            Notes: this.celebrityData.data.Notes,

          }
        )
      }
    })
  }

  backButton() {
    window.history.back();
  }

  onSubmit() {
    console.log(this.updateCelebrityForm.value);

    this.service.updateCelebrity(this.updateCelebrityForm.value, this.source.id).subscribe((res) => {

      this.data = res;
      if (this.data.status === "success") {
        alertify.success("Celebrity updated successfully.")
        this.dialogRef.close();
        this.route.navigate([`home/talent/celebrities`])
      }
      else {
        alertify.error("Celebrity was not updated");
      }

    })
  }


}
