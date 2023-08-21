import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { clientIndustries, countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-audience-details',
  templateUrl: './audience-details.component.html',
  styleUrls: ['./audience-details.component.scss']
})
export class AudienceDetailsComponent {
  
  public countries: string[] = countries;
  public clientIndustries: string[] = clientIndustries;

  @Input() 
  formGroupName: string = '';

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
