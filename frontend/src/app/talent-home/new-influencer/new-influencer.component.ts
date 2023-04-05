import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfluencerService } from 'src/app/core/Services/influencer.service';
import { genders, languages, verticals, countries, nationalities } from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-new-influencer',
  templateUrl: './new-influencer.component.html',
  styleUrls: ['./new-influencer.component.css']
})
export class NewInfluencerComponent {
  newInfluencerForm: FormGroup;
  data:any;

  genders = genders;
  languages = languages;
  verticals = verticals;
  countries = countries;
  nationalities = nationalities;

  constructor(private formBuilder: FormBuilder, private service: InfluencerService, private route: Router, private userService: UserService) {
    this.newInfluencerForm = this.formBuilder.group({
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

  backButton(){
    window.history.back();
  }

  onSubmit() {
    this.service.addInfluencer({...this.newInfluencerForm.value, updatedBy: this.userService.getID() }).subscribe( (res) => {

      this.data = res;
      if(this.data.status === "success"){
         alertify.success("Influencer added successfully.")
         this.route.navigate(['home/talent/influencers'])
        }
      else { alertify.error("Influencer was not added");
      }

    })
  }
}
