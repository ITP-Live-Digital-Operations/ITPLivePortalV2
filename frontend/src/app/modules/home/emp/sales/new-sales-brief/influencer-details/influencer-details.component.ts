import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { clientIndustries, countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-influencer-details',
  templateUrl: './influencer-details.component.html',
  styleUrls: ['./influencer-details.component.scss']
})
export class InfluencerDetailsComponent {
  
  public clientIndustries: string[] = clientIndustries;
  public countries: string[] = countries;

  public showInfo1 = false;
  public showInfo2 = false;
  public showInfo3 = false;
  public showInfo4 = false;
  public showInfo5 = false;

  @Input()
  formGroupName: string = '';

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
