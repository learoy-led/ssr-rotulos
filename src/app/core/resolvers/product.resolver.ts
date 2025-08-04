import { ResolveFn, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { Product } from '../../models/data.models';

export const productResolver: ResolveFn<Product | null> = (route, state) => {
  const getProductsService =  inject(GetProductsService)
   const router =  inject(Router)

  const productSlug = route.paramMap.get('product') ?? '';

  return getProductsService.getProductBySlug(productSlug).pipe(
     catchError(err => {
      if (err.status === 404) {
       router.navigate(['/pagina-no-encontrada']); 
       return throwError(() => new Error('PRODUCT_NOT_FOUND'));
      }
      return of(null); 
    })
  );
};
