import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElementsListComponent } from '../components/elements-list/elements-list.component';
import { NewCategoryModalComponent } from '../components/new-category-modal/new-category-modal.component';
import { EditCategoryModalComponent } from '../components/edit-category-modal/edit-category-modal.component';
import { SeoService } from '../../../core/services/seo.service';
import { GetProductsService } from '../../../core/services/get-products.service';
import { iconPaths } from '../../../data/data';
import { Category, Product } from '../../../models/data.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-categories',
imports: [CommonModule, ElementsListComponent, NewCategoryModalComponent, EditCategoryModalComponent],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit {

public categories$?: Observable <Category[]>;
public newCategoryModalIsOpen: boolean = false;
public updateCategoryModalIsOpen: boolean = false;

public editableElement?: Category  

  public plusPath = iconPaths.plus

  constructor(private seoService: SeoService, private getProductsService: GetProductsService) {}

  ngOnInit() {
      this.seoService.noRobots();  
  this.categories$ = this.getProductsService.getCategories()
}

 public openNewCategoryModal() {
    this.newCategoryModalIsOpen = !this.newCategoryModalIsOpen 
  }

  public onNewModalStateChange(newState: boolean) {
    this.newCategoryModalIsOpen = newState;
  }

    public onUpdateModalStateChange(newState: boolean) {
    this.updateCategoryModalIsOpen = newState;
  }

  public updateCategories(){
  this.categories$ = this.getProductsService.getCategories()
}

public updateEditableElement(element: Product | Category) {
  this.editableElement = element as Category
}

}
