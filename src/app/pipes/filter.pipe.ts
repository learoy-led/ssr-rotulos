import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/data.models';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

   transform(
    elements: (Product)[] | null,
    elementSelected: string
  ): (Product )[] | null | undefined {
    const elementFiltered = elements?.filter((el) =>
      el.name.toLowerCase().includes(elementSelected.toLowerCase())  || el.slug.toLowerCase().includes(elementSelected.toLowerCase()));
    return elements && elementSelected ? elementFiltered : elements;
  }

}