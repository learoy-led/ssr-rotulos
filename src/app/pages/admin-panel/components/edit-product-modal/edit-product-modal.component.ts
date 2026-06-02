import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category, Product } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GetProductsService } from '../../../../core/services/get-products.service';
import { iconPaths } from '../../../../data/data';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-product-modal',
  imports: [FormsModule, CommonModule, DragDropModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent {

  @Input() editableElement?: Category | Product
  @Input() updateProductModalIsOpen = true
  @Output() productUpdated = new EventEmitter<void>()
  @Output() updateProductModalIsOpenState = new EventEmitter<boolean>()



  get productElement(): Product | null {
    return this.editableElement?.type === 'product' ? (this.editableElement as Product) : null;
  }

  public binPath = iconPaths.bin
  public dragPath = iconPaths.drag
  public originalSlug: string = ''

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
    light: false,
    metaDescription: '',
    categories: [],
    variants: [{
      name: '',
      size: 0,
      price: 0
    }],
  }
  public categories$?: Observable<Category[]>;
  public errorMessage:string = ''
  private allowedTypes:string[] = ['image/webp', 'image/jpg', 'image/jpeg']
  private maxSize:number = 2 * 1024 * 1024 //2MB
   public selectedFiles: File[] = [];
  

  constructor(private adminProductsService: AdminProductsService,
    private getProductsService: GetProductsService
  ) {}

  ngOnInit() {
    if (this.productElement) { 
    this.updateProductData = this.productElement
    this.originalSlug = this.productElement.slug
  }
  this.categories$ = this.getProductsService.getCategories()
  }
  
    public onSubmit() {
      
      if (this.errorMessage) return;

      const formData = new FormData();


      Object.entries(this.updateProductData).forEach(([key, value]) => {
  if(key ==='categories') {
  value.forEach((v: any)=> {
formData.append('categories', v._id ?? v);
    })
  } else if(key ==='variants') {
      formData.append('variants', JSON.stringify(value));
  } else if (key === 'images') {
  value.forEach((img: string) => 
    formData.append('images', img)
  );
}  else {
    formData.append(key, value as string);
  }  
});

this.selectedFiles.forEach(file => {
    formData.append('image', file);
  });


      this.adminProductsService.updateElement(formData, 'products', this.originalSlug);
      this.productUpdated.emit()
    }
  
     public closeUpdateProductModal() {
  this.updateProductModalIsOpen = false
   this.updateProductModalIsOpenState.emit(this.updateProductModalIsOpen)
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


 public onDeleteImage(image: string) {
  const deleteConfirmation = confirm('¿Estás seguro de que quieres eliminar la imagen?');
   if (deleteConfirmation) {
   this.updateProductData.images = this.updateProductData.images.filter((img) => img !== image)
  } else return
  }

 public drop(event: CdkDragDrop<string[]>) {
  console.log('dropping')
  moveItemInArray(
    this.updateProductData.images,
    event.previousIndex,
    event.currentIndex
  );
  console.log('moving', event.previousIndex,  event.currentIndex)
}

}
