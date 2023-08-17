import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {
  genders,
  languages,
  verticals,
  countries,
  nationalities,
  itprelatioship,
} from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {
  
  genders: string[] = genders;
  languages: string[] = languages;
  verticals: string[] = verticals;
  countries: string[] = countries;
  nationalities: string[] = nationalities;
  itprelatioship: string[] = itprelatioship;

  @Input()
  formGroupName: string = '';

  @Input()
  isCelebrity!: boolean;

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
