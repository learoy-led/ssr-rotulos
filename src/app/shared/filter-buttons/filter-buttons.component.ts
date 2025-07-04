import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/data.models';
import { Observable } from 'rxjs';

import { GetProductsService } from '../../core/services/get-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-buttons.component.html',
  styleUrl: './filter-buttons.component.css'
})

export class FilterButtonsComponent implements OnInit {

  public categories$?: Observable<Category[]>;
@Input() categorySelectedName: string = ''
@Output() categorySelected = new EventEmitter<string>()
public selectedCategoryIndex: number | null = null

constructor( private getProductsService: GetProductsService ){}

ngOnInit() {
  this.categories$ = this.getProductsService.getCategories();
}


public updateFilterCategory(categoryName: string, index: number | null) {
  this.categorySelectedName = categoryName
  this.categorySelected.emit(this.categorySelectedName)
  this.selectedCategoryIndex = index
};

}
