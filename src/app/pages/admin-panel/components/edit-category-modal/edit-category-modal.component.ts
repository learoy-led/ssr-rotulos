import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category, Product } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-category-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.css'
})
export class EditCategoryModalComponent implements OnInit {

  @Input() editableElement?: Category | Product
  @Output() categoryUpdated = new EventEmitter<void>()

  get categoryElement(): Category | null {
    return this.editableElement?.type === 'category' ? (this.editableElement as Category) : null;
  }

  
  public updateCategoryData: Category = {
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

  @Input() updateCategoryModalIsOpen = true
  @Output() updateCategoryModalIsOpenState = new EventEmitter<boolean>()

  constructor(private adminProductsService: AdminProductsService) {}

ngOnInit() {
  if (this.categoryElement) { 
  this.updateCategoryData = this.categoryElement
}
}

  public onSubmit() {
    this.updateCategoryData && this.adminProductsService.updateElement(this.updateCategoryData, 'categories');
    this.categoryUpdated.emit()
  }

   public closeUpdateCategoryModal() {
this.updateCategoryModalIsOpen = false
 this.updateCategoryModalIsOpenState.emit(this.updateCategoryModalIsOpen)
 }

}
