import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageGroup'
})
export class AgeGroupPipe implements PipeTransform {

  transform(value: string): string {
    let newValue = value;

    newValue = newValue.replace(/AgeGroup1/g, '12 - 17');
    newValue = newValue.replace(/AgeGroup2/g, '18 - 24');
    newValue = newValue.replace(/AgeGroup3/g, '25 - 34');
    newValue = newValue.replace(/AgeGroup4/g, '35 - 49');
    newValue = newValue.replace(/AgeGroup5/g, '50+');

    return newValue;
  }

}
