import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorChange'
})
export class ColorChangePipe implements PipeTransform {

  transform(value: any, color: string): any {
    return '<span style="color: ' + color + ';">' + value + '</span>';
  }

}
