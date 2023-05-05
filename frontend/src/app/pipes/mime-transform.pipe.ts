import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mimeTransform'
})
export class MimeTransformPipe implements PipeTransform {

  transform(value: string): string {
    let segments: string[] = value.split('.');
    let name = segments[segments.length - 1];
    if (name == 'presentation') {
    return 'PowerPoint Presentation'
    }
    else {
      return 'Excel Sheet'
    }
  }

}
