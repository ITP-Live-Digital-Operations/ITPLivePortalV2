import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { clientIndustries, countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-influencer-details',
  templateUrl: './influencer-details.component.html',
  styleUrls: ['./influencer-details.component.scss']
})
export class InfluencerDetailsComponent {
  
  clientIndustries: string[] = clientIndustries;
  countries: string[] = countries;

  showInfo1 = false;
  showInfo2 = false;
  showInfo3 = false;
  showInfo4 = false;
  showInfo5 = false;

  @Input()
  formGroupName: string = '';

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }


}
