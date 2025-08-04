import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { catchError, map, of } from 'rxjs';
import { Category } from '../../models/data.models';

export const categoryResolver: ResolveFn<Category | { navigationCommands: any[] }> = (route, state) => {
   const getProductsService =  inject(GetProductsService)

  const categorySlug = route.paramMap.get('category') ?? '';
  return getProductsService.getCategoryBySlug(categorySlug).pipe(
    map(category => category ?? { navigationCommands: ['/pagina-no-encontrada'] }),
    catchError(() => of({ navigationCommands: ['/pagina-no-encontrada'] }))
  );
  }


 