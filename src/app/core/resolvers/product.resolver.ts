import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Product } from '../../models/data.models';
import { Router } from 'express';

export const productResolver: ResolveFn<Product | null > = (route, state) => {
  const getProductsService =  inject(GetProductsService)
  const router = inject(Router);

  const productSlug = route.paramMap.get('product') ?? '';
 
    return getProductsService.getProductBySlug(productSlug).pipe(
    map(product => {
      if (!product) {
        router.navigate(['/pagina-no-encontrada']);
        return null; 
      }
      return product;
    }),
    catchError(() => {
      router.navigate(['/pagina-no-encontrada']);
      return of(null);
    })
  );
  
};
