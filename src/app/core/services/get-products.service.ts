import { Injectable } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

 public API_URL = environment.API_URL;

  
  constructor(private http: HttpClient) {}


  public getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>( `${this.API_URL}categories`, {
      headers: { 'Content-Type': 'application/json' },
    });   
  }


  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>( `${this.API_URL}products`, {
      headers: { 'Content-Type': 'application/json' },
    });   
   
  } 

  public getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>( `${this.API_URL}categories/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
    });   
  }

  public getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>( `${this.API_URL}products/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
    });   
  }

public getCategoryWithProductSlug(slug: string): Observable<Category | null> {
  return this.getCategories().pipe(
    map(categories => {
      const category = categories.find(category =>
        category.products.some(product => product.slug === slug)
      );
      return category ? category : null;
    })
  );
}

}