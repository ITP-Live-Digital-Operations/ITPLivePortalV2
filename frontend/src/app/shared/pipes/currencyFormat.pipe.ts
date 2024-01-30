import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCurrencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): string {
    if (isNaN(value) || value === null) {
      return '';
    }

    return '$' + value.toFixed(decimals);
  }




}
