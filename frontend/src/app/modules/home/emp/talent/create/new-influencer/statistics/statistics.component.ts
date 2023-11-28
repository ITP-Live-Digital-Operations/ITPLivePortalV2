import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { countries } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  public countries = countries;

  @Input()
  formGroupName: string = '';

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit(): void {
    /* this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup; */
  }
}
