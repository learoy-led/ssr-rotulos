import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { Category, Product } from '../../models/data.models';
import { Observable } from 'rxjs';
import { GetProductsService } from '../../core/services/get-products.service';
import { CommonModule } from '@angular/common';
import { ElementsListComponent } from './components/elements-list/elements-list.component';
import { NewCategoryModalComponent } from './components/new-category-modal/new-category-modal.component';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { NewProductModalComponent } from './components/new-product-modal/new-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { iconPaths } from '../../data/data';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
    selector: 'app-admin-panel',
      standalone: true,
    imports: [CommonModule, ElementsListComponent, NewCategoryModalComponent, EditCategoryModalComponent, NewProductModalComponent, EditProductModalComponent, IconComponent],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

  public categories$?: Observable <Category[]>;
  public products$?: Observable <Product[]>;

  public newCategoryModalIsOpen: boolean = false;
  public updateCategoryModalIsOpen: boolean = false;
  public newProductModalIsOpen: boolean = false;
  public updateProductModalIsOpen: boolean = false;
  
  public editableElement?: Category | Product 

  public plusPath = iconPaths.plus

 constructor(private seoService: SeoService, private getProductsService: GetProductsService) {}

 
  ngOnInit() {
      this.seoService.noRobots();
    
  this.categories$ = this.getProductsService.getCategories()
  this.products$ = this.getProductsService.getAllProducts()
}

  public openNewCategoryModal() {
    this.newCategoryModalIsOpen = !this.newCategoryModalIsOpen 
  }

  public openNewProductModal() {
    this.newProductModalIsOpen = !this.newProductModalIsOpen 
  }

  public onNewModalStateChange(newState: boolean) {
    this.newCategoryModalIsOpen = newState;
  }

  public onNewProdModalStateChange(newState: boolean) {
    this.newProductModalIsOpen = newState;
  }


  public onUpdateModalStateChange(newState: boolean) {
    this.updateCategoryModalIsOpen = newState;
  }

  public onUpdateProductModalStateChange(newState: boolean) {
    this.updateProductModalIsOpen = newState;
  }


public updateCategories(){
  this.categories$ = this.getProductsService.getCategories()
}

public updateProducts(){
  this.products$ = this.getProductsService.getAllProducts()
}

public updateEditableElement(element: Category | Product) {
  this.editableElement = element
}
}
