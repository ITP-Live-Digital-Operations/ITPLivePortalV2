import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { UserService } from 'src/app/core/services/user.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { twoWays } from '@syncfusion/ej2-angular-inputs/src/textbox/textbox.component';

@Component({
  selector: 'app-new-influencer',
  templateUrl: './new-influencer.component.html',
  styleUrls: ['./new-influencer.component.scss'],
})
export class NewInfluencerComponent {
  protected newInfluencerForm!: FormGroup;
  private data: any;
  protected isNotCelebrity: boolean = true;
  protected path = PATH;

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
      //GENERAL INFO
      generalInfo: this.formBuilder.group({
        Name: ['', [Validators.required]],
        Number: [''],
        Email: ['', [Validators.email]],
        Occupation: [''],
        ItpRelationship: [''],
        Nationality: [''],
      }),
      //SOCIALS
      socials: this.formBuilder.group({
        InstagramHandle: [''],
        TiktokHandle: [''],
        YoutubeHandle: [''],
        SnapchatHandle: [''],
        SnapchatFollowers: [''],
        TwitterHandle: [''],
        TwitterFollowers: [''],
        TwitchHandle: [''],
        TwitchFollowers: [''],
      }, {
        validators: [
          requireAtLeastTwoHandlesValidator(),
          handleWithFollowersValidator('SnapchatHandle', 'SnapchatFollowers'),
          handleWithFollowersValidator('TwitterHandle', 'TwitterFollowers'),
          handleWithFollowersValidator('TwitchHandle', 'TwitchFollowers')
        ]
      }),

      //LICENSES
      KSALicense: [''],
      UAELicense: [''],
      //AGENCY INFO
      agencyInfo: this.formBuilder.group({
        AgencyContactPerson: [''],
        AgencyNumber: [],
        AgencyEmail: ['', [Validators.email]],
      }),
      //EXTRA INFO
      extraInfo: this.formBuilder.group({
        PreviousBrands: [''],
        Bio: [''],
        Notes: [''],
      }),
    });
  }

  protected onSubmit(): void {
    const formValues = this.processFormGroups(this.newInfluencerForm);
    formValues.updatedBy = this.userService.getID();

    console.log({ ...formValues });

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
          if (control.value === '') {
            valuesObject[key] = null; // if the value is an empty string, set it to null
          } else if (
            (key.endsWith('Followers') || key.endsWith('Number')) &&
            typeof control.value === 'string'
          ) {
            valuesObject[key] = parseInt(control.value, 10) || null; // convert to integer or set to null if NaN
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


export function requireAtLeastTwoHandlesValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const controls = group.value;
    const handles = [
      controls.InstagramHandle,
      controls.TiktokHandle,
      controls.SnapchatHandle,
      controls.TwitterHandle,
      controls.FacebookHandle,
      controls.YoutubeHandle,
      controls.TwitchHandle,
    ];

    const filledHandles = handles.filter(handle => handle && handle.trim() !== '');

    const instagramTiktokYoutubeFilled = [
      controls.InstagramHandle,
      controls.TiktokHandle,
      controls.YoutubeHandle,
    ].some(handle => handle && handle.trim() !== '');

    if (filledHandles.length >= 2 && instagramTiktokYoutubeFilled) {
      return null; // No error, validation passed
    }

    return { requireAtLeastTwoHandles: true }; // Error, validation failed
  };
}

export function handleWithFollowersValidator(handleKey: string, followersKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const handle = group.get(handleKey);
    const followersControl = group.get(followersKey);

    if (handle && followersControl) {
      handle.valueChanges.subscribe(() => {
        if (handle.value && !followersControl.value) {
          followersControl.setErrors({ required: true });
          followersControl.markAsTouched();
        } else if (!handle.value) {
          followersControl.setErrors(null);
        }
      });

      if (handle.value && !followersControl.value) {
        followersControl.setErrors({ required: true });
      } else if (!handle.value) {
        followersControl.setErrors(null);
      }
    }

    return null;
  };
}
