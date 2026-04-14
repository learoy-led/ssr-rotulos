import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number | null): string {
     if (price == null) return '0 €';
    return (price/100).toFixed(2).replace('.', ',') + ' €'
  }

}
