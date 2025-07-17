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

  constructor(private getProductsService: GetProductsService  ){} 

  ngOnInit() {
   this.categories$ = this.getProductsService.getCategories()
  }
 

  public onCategorySelectedChange(categoryName:string) {
this.categorySelectedName = categoryName
  }

  public isCategory(obj: Category | Product): obj is Category {
  return (obj as Category).products !== undefined;
}

}
