import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { Observable } from 'rxjs';
import { GetProductsService } from '../../core/services/get-products.service';
import { CommonModule } from '@angular/common';
import { ElementsListComponent } from './components/elements-list/elements-list.component';
import { NewProductModalComponent } from './components/new-product-modal/new-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { iconPaths } from '../../data/data';
import { Category, Product } from '../../models/data.models';


@Component({
    selector: 'app-admin-panel',
      standalone: true,
    imports: [CommonModule, ElementsListComponent, NewProductModalComponent, EditProductModalComponent],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

  
  public products$?: Observable <Product[]>;
  
  public newProductModalIsOpen: boolean = false;
  public updateProductModalIsOpen: boolean = false;
  
  public editableElement?: Product 

  public plusPath = iconPaths.plus

 constructor(private seoService: SeoService, private getProductsService: GetProductsService) {}

 
  ngOnInit() {
      this.seoService.noRobots();
  this.products$ = this.getProductsService.getAllProducts()
}

  public openNewProductModal() {
    this.newProductModalIsOpen = !this.newProductModalIsOpen 
  } 

  public onNewProdModalStateChange(newState: boolean) {
    this.newProductModalIsOpen = newState;
  }

  public onUpdateProductModalStateChange(newState: boolean) {
    this.updateProductModalIsOpen = newState;
  }

public updateProducts(){
  this.products$ = this.getProductsService.getAllProducts()
}

public updateEditableElement(element: Product | Category) {
  this.editableElement = element as Product
}
}
