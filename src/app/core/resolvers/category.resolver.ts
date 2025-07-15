import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { catchError, of } from 'rxjs';
import { Category } from '../../models/data.models';

export const categoryResolver: ResolveFn<Category | null> = (route, state) => {
   const getProductsService =  inject(GetProductsService)
   const router =  inject(Router)

   null

  const categorySlug = route.paramMap.get('category') ?? '';
  return getProductsService.getCategoryBySlug(categorySlug).pipe(
     catchError(err => {
      if (err.status === 404) {
        router.navigate(['/pagina-no-encontrada']);
        return of(null); 
      }
      return of(null); 
    })
  );

};
