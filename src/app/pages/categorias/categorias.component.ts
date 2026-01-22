import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../shared/cards/cards.component';
import { FilterButtonsComponent } from '../../shared/filter-buttons/filter-buttons.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { GetProductsService } from '../../core/services/get-products.service';

@Component({
    selector: 'app-categorias',
      standalone: true,
    imports: [CardsComponent, CommonModule, FilterButtonsComponent, FilterPipe],
    templateUrl: './categorias.component.html',
    styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

public categories$?: Observable <Category[]>;
  public categorySelectedName: string = ''
public productsInCategory$?: Observable <Product[]>
private productsCache = new Map<string, Observable<Product[]>>();

  constructor(private getProductsService: GetProductsService  ){} 

  ngOnInit() {
    this.categories$ = this.getProductsService.getCategories();
  }


  public getProductsInCategory(categorySlug: string): Observable<Product[]> {
  if (!this.productsCache.has(categorySlug)) {
    this.productsCache.set(categorySlug, this.getProductsService.getProductsByCategory(categorySlug));
  }
  return this.productsCache.get(categorySlug)!;
}

  public onCategorySelectedChange(categoryName:string) {
this.categorySelectedName = categoryName
  }

}
