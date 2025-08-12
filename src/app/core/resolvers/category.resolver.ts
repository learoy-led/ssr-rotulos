import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { catchError, map, of } from 'rxjs';
import { Category } from '../../models/data.models';

export const categoryResolver: ResolveFn<Category | null> = (route, state) => {
  const getProductsService = inject(GetProductsService);
  const router = inject(Router);
  const categorySlug = route.paramMap.get('category') ?? '';
  return getProductsService.getCategoryBySlug(categorySlug);
};
