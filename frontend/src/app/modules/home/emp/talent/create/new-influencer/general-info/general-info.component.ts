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
  
  public genders: string[] = genders;
  public languages: string[] = languages;
  public verticals: string[] = verticals;
  public countries: string[] = countries;
  public nationalities: string[] = nationalities;
  public itprelatioship: string[] = itprelatioship;

  @Input()
  formGroupName: string = '';

  @Input()
  isCelebrity!: boolean;

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
