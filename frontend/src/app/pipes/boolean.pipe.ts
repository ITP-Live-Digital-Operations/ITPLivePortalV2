import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean, trueText: string, falseText: string): string {
    return value ? trueText : falseText;
  }

}
