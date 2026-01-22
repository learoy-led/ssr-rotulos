import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category, Product } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  public API_URL = environment.API_URL || '';
  
  constructor(private http: HttpClient) {}

  public deleteElement(slug: string, type: string) {
    let typeSlug = ''
    if (type === 'category') {typeSlug = 'categories'} else if (type === 'product') {typeSlug = 'products'}
      return this.http.delete(`${this.API_URL}${typeSlug}/${slug}`, {
        headers: { 'Content-Type': 'application/json' },
      }).subscribe( response => {
        alert('El elemento se ha eliminado correctamente.')
        },
           error => {
            alert('Se ha producido un error al eliminar el elemento. Por favor, inténtalo más tarde.')
            }
         );
  }

  public addElement(element: FormData | Category, typeSlug:string) {
    
      return this.http.post(`${this.API_URL}${typeSlug}`, element).subscribe( response => {
        alert('El elemento se ha añadido correctamente.')
    },
       error => {
        alert('Se ha producido un error al añadir el elemento. Por favor, inténtalo más tarde.')
        }
     );
  }

  public updateElement(element: Product | Category) {
    let typeSlug = ''
    if (element.type === 'category') {typeSlug = 'categories'} else if (element.type === 'product') {typeSlug = 'products'}
      return this.http.put(`${this.API_URL}${typeSlug}/${element.slug}`, element, {
        headers: { 'Content-Type': 'application/json' },
      }).subscribe( response => {
        alert('El elemento se ha actualizado correctamente.')
    },
       error => {
        alert('Se ha producido un error al actualizar el elemento. Por favor, inténtalo más tarde.')
        }
     );
  }

}
