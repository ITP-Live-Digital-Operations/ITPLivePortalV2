import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Component({
  selector: 'app-edit-influencer',
  templateUrl: './edit-influencer.component.html',
  styleUrls: ['./edit-influencer.component.scss'],
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
    private dialogRef: MatDialogRef<EditInfluencerComponent>
  ) {
    this.initializeElements();
    this.GetInfluencerData(this.source.id);
  }

  private initializeElements(): void {
    this.editInfluencerForm = this.formBuilder.group({
      generalInfo: this.formBuilder.group({
        Name: ['', [Validators.required]],
        Number: [''],
        Email: ['', [Validators.email]],
        Occupation: [''],
        ItpRelationship: [''],
        Nationality: [''],

      }),
      socials: this.formBuilder.group(
        {
          InstagramHandle: [''],

          TiktokHandle: [''],

          SnapchatHandle: [''],


          TwitterHandle: [''],


          FacebookHandle: [''],

          YoutubeHandle: [''],

          TwitchHandle: [''],
          
        },
        { validators: requireAtLeastTwoHandlesValidator() }
      ),

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
  closeDialog(): void {
    this.dialogRef.close();
  }
  private GetInfluencerData(inputdata: any): void {
    this.service.getInfluencer(inputdata).subscribe((item) => {
      this.influencerData = item;
      if (this.influencerData.data != null) {
        this.editInfluencerForm.setValue({
          generalInfo: {
            Name: this.influencerData.data.Name,
            Number: this.influencerData.data.Number,
            Email: this.influencerData.data.Email,
            Occupation: this.influencerData.data.Occupation,
            ItpRelationship: this.influencerData.data.ItpRelationship,
            Nationality: this.influencerData.data.Nationality,
          },
          socials: {
            InstagramHandle: this.influencerData.data.InstagramHandle,

            TiktokHandle: this.influencerData.data.TiktokHandle,

            SnapchatHandle: this.influencerData.data.SnapchatHandle,

            TwitterHandle: this.influencerData.data.TwitterHandle,

            FacebookHandle: this.influencerData.data.FacebookHandle,

            YoutubeHandle: this.influencerData.data.YoutubeHandle,

            TwitchHandle: this.influencerData.data.TwitchHandle,
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
          },
        });
      }
    });
  }

  public onSubmit(): void {
    const formValues = this.processFormGroups(this.editInfluencerForm);
    this.service
      .updateInfluencer(formValues, this.source.id)
      .subscribe((res) => {
        this.data = res;
        if (this.data.status === 'success') {
          this.dialogRef.close();
          this.toastrService.success('Influencer Edited Successfully!');
        } else {
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

    const filledHandles = handles.filter(
      (handle) => handle && handle.trim() !== ''
    );

    const instagramTiktokYoutubeFilled = [
      controls.InstagramHandle,
      controls.TiktokHandle,
      controls.YoutubeHandle,
    ].some((handle) => handle && handle.trim() !== '');

    if (filledHandles.length >= 2 && instagramTiktokYoutubeFilled) {
      return null; // No error, validation passed
    }

    return { requireAtLeastTwoHandles: true }; // Error, validation failed
  };
}
