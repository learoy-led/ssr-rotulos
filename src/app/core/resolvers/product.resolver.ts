import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { inject } from '@angular/core';
import { Product } from '../../models/data.models';
import { map } from 'rxjs';


export const productResolver: ResolveFn<Product | RedirectCommand | null> = (route) => {

  const getProductsService = inject(GetProductsService);
  const router = inject(Router);

  const categorySlug = route.paramMap.get('category') ?? '';
  const productSlug = route.paramMap.get('product') ?? '';

  
   return getProductsService.getProductBySlug(productSlug).pipe(
    map((product) => {
      const canonicalCategory = product.categories[0];

      if (
        canonicalCategory &&
        canonicalCategory.slug !== categorySlug
      ) {
        
 return new RedirectCommand(
          router.createUrlTree([
            '/',
            canonicalCategory.slug,
            product.slug,
          ])
        );
        
      }

      return product;
    })
  );
};
