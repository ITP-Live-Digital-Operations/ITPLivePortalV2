import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss'],
})
export class AgencyInfoComponent {

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