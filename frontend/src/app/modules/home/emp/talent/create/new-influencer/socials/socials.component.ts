import { Component, Input} from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl} from '@angular/forms';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent {

  @Input()
  formGroupName: string = '';

  @Input()
  isCelebrity !: boolean;

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective){ }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
  formatNumber(value: number | null): string {
    return value !== null ? value.toLocaleString() : '';
  }

  onNumericInput(fieldName: string, value: string): void {
    const parsedValue = this.parseFormattedNumber(value);
    this.form.get(fieldName)?.setValue(parsedValue, { emitEvent: false });
  }
  

  parseFormattedNumber(value: string): number {
    return Number(value.replace(/,/g, ''));
  }
}
