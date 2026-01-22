import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-category-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-category-modal.component.html',
  styleUrl: './new-category-modal.component.css'
})
export class NewCategoryModalComponent {

   public newCategoryData: Category = {
    type: 'category',
    name: '',
    slug: '',
    description: {
      application: '',
      products: '',
      custom: '',
      cost: '',
      metaDescription: ''
    },
  image: ''
  }
  @Input() newCategoryModalIsOpen = true
  @Output() newCategoryModalIsOpenState = new EventEmitter<boolean>()
  @Output() categoryAdded = new EventEmitter<void>(); 

  constructor(private adminProductsService: AdminProductsService) {}

  public onSubmit() {
    this.newCategoryData && this.adminProductsService.addElement(this.newCategoryData, 'categories');
    this.categoryAdded.emit()
  }
  

  public closeNewCategoryModal() {
    this.newCategoryModalIsOpen = false
    this.newCategoryModalIsOpenState.emit(this.newCategoryModalIsOpen)
  }

}
