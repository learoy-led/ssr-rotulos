import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/data.models';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

   transform(
    categories: Category[] | null,
    categorySelected: string
  ): Category[] | null | undefined {
    const categoryFiltered = categories?.filter((category) =>
      category.name.toLowerCase() === categorySelected.toLowerCase());
    return categories && categorySelected ? categoryFiltered : categories;
  }

}
