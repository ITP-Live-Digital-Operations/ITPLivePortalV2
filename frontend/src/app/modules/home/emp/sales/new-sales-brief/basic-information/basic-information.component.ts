import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { campaignobjectives, clientIndustries, currencies } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent {
  
  public clientIndustries: string[] = clientIndustries;
  public campaignobjectives: string[] = campaignobjectives;
  public currencies: string[] = currencies;

  @Input() 
  formGroupName: string = '';

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){  }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
