import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  public API_URL = environment.API_URL || '';
  
  constructor(private http: HttpClient) {}



  public addElement(element: FormData | Category, typeSlug:string) {
    
      return this.http.post(`${this.API_URL}${typeSlug}`, element).subscribe( response => {
        alert('El elemento se ha añadido correctamente.')
    },
       error => {
        alert('Se ha producido un error al añadir el elemento. Por favor, inténtalo más tarde.')
        }
     );
  }


  public updateElement(element: FormData | Category, typeSlug:string, originalSlug: string) {
    
      return this.http.put(`${this.API_URL}${typeSlug}/${originalSlug}`, element
      ).subscribe( response => {
        alert('El elemento se ha actualizado correctamente.')
    },
       error => {
        alert('Se ha producido un error al actualizar el elemento. Por favor, inténtalo más tarde.')
        }
     );
  }

  
  public markAsDeleted(slug: string, type: string) {
  let typeSlug = ''
  if (type === 'category') {typeSlug = 'categories'} else if (type === 'product') {typeSlug = 'products'}
  return this.http.delete(`${this.API_URL}${typeSlug}/${slug}`, {}).subscribe( response => {
        alert('El elemento se ha movido a la papelera.')
    },
       error => {
        alert('Se ha producido un error al mover el elemento a la papelera. Por favor, inténtalo más tarde.')
        }
     );
  }

}
