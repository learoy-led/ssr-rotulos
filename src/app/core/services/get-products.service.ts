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
    return this.http.get<Category[]>( `${this.API_URL}categories`);   
  }


  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>( `${this.API_URL}products`);   
  } 

  public getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>( `${this.API_URL}categories/${slug}`);   
  }

  public getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>( `${this.API_URL}products/${slug}`);   
  }

  
public getCategoryWithProductSlug(slug: string): Observable<Category | null> {
 return this.http.get<Product>( `${this.API_URL}products/${slug}`).pipe(
  map(product => product.categories[0])
 )
}

public getProductsByCategory(slug:string): Observable<Product[]> {
  return this.http.get<Product[]>( `${this.API_URL}products`).pipe(
     map(
          (products) => products.filter((product) => 
            product.categories.some((category) =>
             category.slug === slug
            ))
             )
        ); 
} 

}