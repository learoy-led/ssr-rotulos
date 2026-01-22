import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-product-modal.component.html',
  styleUrl: './new-product-modal.component.css'
})
export class NewProductModalComponent {

    public newProductData: Product = {
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
    categories: [],
  }
  public selectedFiles: File[] = [];
  @Input() newProductModalIsOpen = true
  @Output() newProductModalIsOpenState = new EventEmitter<boolean>()
  @Output() productAdded = new EventEmitter<void>(); 

  public errorMessage:string = ''
  private allowedTypes:string[] = ['image/webp']
  private maxSize:number = 2 * 1024 * 1024 //2MB

  constructor(private adminProductsService: AdminProductsService) {}

  public onSubmit() {
     if (this.errorMessage) return;

      const formData = new FormData();


  Object.entries(this.newProductData).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  this.selectedFiles.forEach(file => {
    formData.append('image', file);
  });

  this.adminProductsService.addElement(formData, 'products');
    this.productAdded.emit()
  }

  public closeNewProductModal() {
    this.newProductModalIsOpen = false
    this.newProductModalIsOpenState.emit(this.newProductModalIsOpen)
  }

public onFilesSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;

    this.errorMessage = '';
  const files = Array.from(input.files);

   for (const file of files) {
    if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Formato no permitido.';
      return;
    }

    if (file.size > this.maxSize) {
      this.errorMessage = 'La imagen no puede superar los 2MB.';
      return;
    }
  }

  this.selectedFiles = files;

}
}
