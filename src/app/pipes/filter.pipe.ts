import { Pipe, PipeTransform } from '@angular/core';
import { Category, Product } from '../models/data.models';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

   transform(
    elements: (Category | Product )[] | null,
    elementSelected: string
  ): (Category | Product )[] | null | undefined {
    const elementFiltered = elements?.filter((el) =>
      el.name.toLowerCase() === elementSelected.toLowerCase());
    return elements && elementSelected ? elementFiltered : elements;
  }

}