import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

   transform(name: string): string {
 return name === 'Tiras y módulos LED' ?  'las' :  'los'
  }

}
