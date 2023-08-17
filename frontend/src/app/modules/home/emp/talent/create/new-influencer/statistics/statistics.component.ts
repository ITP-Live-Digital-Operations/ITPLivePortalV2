import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  countries = countries;

  @Input()
  formGroupName: string = '';

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
