import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';

export const productsResolver: ResolveFn<unknown> = (route, state) => {
 const getProductsService =  inject(GetProductsService)
  return getProductsService.getCategories();
};
