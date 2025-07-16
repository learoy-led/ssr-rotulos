import { Pipe, PipeTransform } from '@angular/core';
import { Category, Product } from '../models/data.models';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(elements: (Product | Category)[]) : (Product | Category)[] {
    
      return [...elements].sort((a, b) => {
    const aHasOrder = typeof a.order === 'number';
    const bHasOrder = typeof b.order === 'number';

    if (aHasOrder && bHasOrder) {
      return a.order! - b.order!;
    } else if (aHasOrder) {
      return -1; 
    } else if (bHasOrder) {
      return 1;
    } else {
      return 0; 
    }
  });
  }
  

}