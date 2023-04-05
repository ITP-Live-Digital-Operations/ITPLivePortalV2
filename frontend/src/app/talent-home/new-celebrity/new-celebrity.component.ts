import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { genders, languages, verticals, countries, nationalities } from 'src/assets/influencer-form-arrays';
import * as alertify from 'alertifyjs';
import { CelebrityService } from 'src/app/core/Services/celebrity.service';
import { UserService } from 'src/app/core/Services/user.service';


@Component({
  selector: 'app-new-celebrity',
  templateUrl: './new-celebrity.component.html',
  styleUrls: ['./new-celebrity.component.css']
})
export class NewCelebrityComponent {

  newCelebrityForm: FormGroup;
  data:any;

  genders = genders;
  languages = languages;
  verticals = verticals;
  countries = countries;
  nationalities = nationalities;

  constructor(private formBuilder: FormBuilder, private service: CelebrityService, private route: Router, private userService: UserService){
    this.newCelebrityForm = this.formBuilder.group({
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

  onSubmit(){
    this.service.addCelebrity({...this.newCelebrityForm.value, updatedBy : this.userService.getID()}).subscribe( (res)=> {
      this.data = res;
      if(this.data.status === "success"){
        alertify.success("Celebrity added successfully.")
        this.route.navigate(['home/talent/celebrities'])
       }
     else { alertify.error("Influencer was not added");
     }
    })
  }




  backButton(){
    window.history.back();
  }

}
