import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

   transform<T extends {name: string; slug: string}>
   (
    elements: T[] | null,
    elementSelected: string
  ): T[] | null {
    if (!elements) return null;
if (!elementSelected) return elements;
    const elementFiltered = elements.filter((el) =>
      el.name.toLowerCase().includes(elementSelected.toLowerCase())  || el.slug.toLowerCase().includes(elementSelected.toLowerCase()));    
    return elementFiltered
  }

}