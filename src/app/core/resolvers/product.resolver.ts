import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { inject } from '@angular/core';
import { Product } from '../../models/data.models';

export const productResolver: ResolveFn<Product | null> = (route, state) => {
  const getProductsService = inject(GetProductsService);
  const productSlug = route.paramMap.get('product') ?? '';
  return getProductsService.getProductBySlug(productSlug);
};
