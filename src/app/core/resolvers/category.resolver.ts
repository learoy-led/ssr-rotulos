import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { Category } from '../../models/data.models';

export const categoryResolver: ResolveFn<Category | null> = (route, state) => {
  const getProductsService = inject(GetProductsService);
  const categorySlug = route.paramMap.get('category') ?? '';
  return getProductsService.getCategoryBySlug(categorySlug);
};
