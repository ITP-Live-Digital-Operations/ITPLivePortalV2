import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { briefPlatforms } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.scss']
})
export class CampaignOverviewComponent {
  briefPlatforms: string[] = briefPlatforms;

  @Input() formGroupName: string = '';

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
