import { Component, Input} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent {

  @Input()
  formGroupName: string = '';

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
