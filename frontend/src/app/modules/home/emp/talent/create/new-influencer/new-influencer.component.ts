import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
@Component({
  selector: 'app-new-influencer',
  templateUrl: './new-influencer.component.html',
  styleUrls: ['./new-influencer.component.scss'],
})
export class NewInfluencerComponent {
  public newInfluencerForm!: FormGroup;
  private data: any;
  public isNotCelebrity: boolean = true;
  public path = PATH;
  constructor(
    private formBuilder: FormBuilder,
    private service: InfluencerService,
    private route: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.initializeElements();
  }
  private initializeElements(): void {
    this.newInfluencerForm = this.formBuilder.group({
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
      statistics: this.formBuilder.group({
        AudienceMalePer: [''],
        AudienceFemalePer: [''],
        AgeGroup1317: [''],
        AgeGroup1824: [''],
        AgeGroup2534: [''],
        AgeGroup3544: [''],
        AgeGroup4554: [''],
        AgeGroup55: [''],
        AudienceTopCountries1: [''],
        AudienceTopCountries1Percentage: [''],
        AudienceTopCountries2: [''],
        AudienceTopCountries2Percentage: [''],
        AudienceTopCountries3: [''],
        AudienceTopCountries3Percentage: [''],
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
  public onSubmit(): void {
    const formValues = this.processFormGroups(this.newInfluencerForm);
    formValues.updatedBy = this.userService.getID();
    console.log(formValues);
    this.service.addInfluencer({ ...formValues }).subscribe((res) => {
      this.data = res;
      if (this.data.status === 'success') {
        this.route.navigate([this.path['influencers']]);
        this.toastrService.success('Influencer Added Successfully!');
      } else {
        this.toastrService.warning('Influencer Not Added!');
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
          if(control.value === ''){
            valuesObject[key] = 'null';
          }
          else {
            valuesObject[key] = control.value;
          }
        }
      });
    }
    return valuesObject;
  }
}
