import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Product } from '../../models/data.models';

export const productResolver: ResolveFn<Product | { navigationCommands: any[] }> = (route, state) => {
  const getProductsService =  inject(GetProductsService)

  const productSlug = route.paramMap.get('product') ?? '';
 return getProductsService.getProductBySlug(productSlug).pipe(
    map(product => product ?? { navigationCommands: ['/pagina-no-encontrada'] }),
    catchError(() => of({ navigationCommands: ['/pagina-no-encontrada'] }))
  );
  
};
