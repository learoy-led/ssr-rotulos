import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

   transform<T extends {name: string; slug: string; light: boolean}>
   (
    elements: T[] | null,
    elementSelected: string
  ): T[] | null {
    if (!elements) return null;
if (!elementSelected) return elements;

let elementFiltered
  if (elementSelected.toLowerCase() === 'rótulos luminosos') {
elementFiltered = elements.filter(el => el.light)
  } else if (elementSelected.toLowerCase() === 'rótulos sin luz') {
elementFiltered = elements.filter(el => !el.light)
  } else { 
    elementFiltered = elements.filter((el) => 
      el.name.toLowerCase().includes(elementSelected.toLowerCase())  || el.slug.toLowerCase().includes(elementSelected.toLowerCase()));    
    }
    return elementFiltered
  }

}