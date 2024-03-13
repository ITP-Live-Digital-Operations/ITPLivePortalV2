import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean | number, ...args: unknown[]): string {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    } else if (typeof value === 'number') {
      return value === 1 ? 'Yes' : 'No';
    } else {
      return 'No'; // Default case or you can throw an error for invalid types
    }
  }

}
