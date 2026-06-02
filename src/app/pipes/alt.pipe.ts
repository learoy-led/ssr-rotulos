import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alt'
})
export class AltPipe implements PipeTransform {

  transform(url: string): string {

    if (!url) {
      return '';
    }
 const lastPart = url.substring(url.lastIndexOf('/') + 1);
return lastPart.split('_')[0]
  }

}


