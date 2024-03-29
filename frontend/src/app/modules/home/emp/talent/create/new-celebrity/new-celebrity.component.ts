import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-new-celebrity',
  templateUrl: './new-celebrity.component.html',
  styleUrls: ['./new-celebrity.component.scss'],
})
export class NewCelebrityComponent {

  protected newCelebrityForm!: FormGroup;
  private data: any;
  protected isCelebrity: boolean = false;
  protected path = PATH;

  constructor(
    private formBuilder: FormBuilder,
    private service: CelebrityService,
    private route: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.initializeElements();
  }

  private initializeElements(): void {
    this.newCelebrityForm = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        Name: ['', [Validators.required]],
        Gender: ['', [Validators.required]],
        Number: [''],
        Email: ['',],
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
        InstagramFollowers: [],
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
        Game:   [''],
        PreviousBrands: [''],
        Bio: [''],
        Notes: [''],
        Rating: [''],
      }),
    });
  }

  protected onSubmit(): void {
    console.log(this.newCelebrityForm);
    const formValues = this.processFormGroups(this.newCelebrityForm);
    formValues.updatedBy = this.userService.getID();
    console.log(formValues);


    this.service.addCelebrity({ ...formValues }).subscribe((res) => {
      this.data = res;
      if (this.data.status === 'success') {
        this.toastrService.success('Celebrity Added Successfully!');
        this.route.navigate([this.path['celebrities']]);
      } else {
        this.toastrService.warning('Celebrity Not Added!');
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
          if ((key.endsWith('Followers') || key.endsWith('Number')) && (control.value === null || control.value === undefined || control.value === '')) {
            valuesObject[key] = null;
        } else {
            valuesObject[key] = control.value;
        }

        }
      });
    }
    return valuesObject;
  }
  activeTabIndex: number = 0;
  tabCount: number = 4; 
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
}

