import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
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

public items: string[] = [];

@Input() filterParam: string = '';
@Input() itemSelected: string = '';



@Output() itemSelectedUpdate = new EventEmitter<string>()
public selectedItemIndex: number | null = null

constructor( private getProductsService: GetProductsService ){}

ngOnInit() {
 
  if (this.filterParam === 'light') {
  this.items = ["Letras luminosas", "Letras sin luz"]
  } 

   if (this.filterParam === 'categories') {
   this.getProductsService.getCategories().subscribe(categories => {
    this.items = categories.map(cat => cat.name);
  }
)
     
  } 
  
}


public updateFilterCategory(itemName: string, index: number | null) {
  this.itemSelected = itemName
  this.itemSelectedUpdate.emit(this.itemSelected)
  this.selectedItemIndex = index
};

}
