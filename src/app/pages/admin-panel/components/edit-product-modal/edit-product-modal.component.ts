import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category, Product } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent {

    @Input() editableElement?: Category | Product
  @Output() productUpdated = new EventEmitter<void>()

  get productElement(): Product | null {
    return this.editableElement?.type === 'product' ? (this.editableElement as Product) : null;
  }

  public updateProductData: Product = {
    type: 'product',
    name: '',
    slug: '',
    images: [],
    description: '',
    material: '',
    design: '',
    installation: '',
    application: '',
    metaDescription: '',
    categories: []
  }
  
  @Input() updateProductModalIsOpen = true
  @Output() updateProductModalIsOpenState = new EventEmitter<boolean>()


  constructor(private adminProductsService: AdminProductsService) {}

  ngOnInit() {
    if (this.productElement) { 
    this.updateProductData = this.productElement
  }
  }
  
    public onSubmit() {
      this.updateProductData && this.adminProductsService.updateElement(this.updateProductData);
      this.productUpdated.emit()
    }
  
     public closeUpdateProductModal() {
      console.log('clic cerrar 1', this.updateProductModalIsOpen)
  this.updateProductModalIsOpen = false
  console.log('clic cerrar 2', this.updateProductModalIsOpen)
   this.updateProductModalIsOpenState.emit(this.updateProductModalIsOpen)
   }

}
