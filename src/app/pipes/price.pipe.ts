import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

transform(price: number | null): string { 
  if (price == null) return '0 €'; 

   const euros = price/100;


  if (euros >= 1000 && Number.isInteger(euros)) {
    return euros.toLocaleString('es-ES', {
      maximumFractionDigits: 0
    }) + ' €';
  } 
  else return euros.toFixed(2).replace('.', ',') + ' €' }
    
}
  
