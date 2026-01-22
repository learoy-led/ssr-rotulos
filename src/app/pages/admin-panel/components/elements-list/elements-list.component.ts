import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category, Product } from '../../../../models/data.models';
import { AdminProductsService } from '../../../../services/admin-products.service';
import { iconPaths, IMAGEPREURL } from '../../../../data/data';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { AltPipe } from '../../../../pipes/alt.pipe';

@Component({
  selector: 'app-elements-list',
  imports: [CommonModule, IconComponent, AltPipe],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.css'
})
export class ElementsListComponent {

   @Input() elements: (Category | Product)[] | null = [];
  displayedElements: (Category | Product)[] = [];

  public srcImage: string = ''
  public imagePrefix: string = IMAGEPREURL
  public binPath = iconPaths.bin
  public pencilPath = iconPaths.pencil
  
 @Input() editableElement?: Product | Category
 @Output() updateEditableElement = new EventEmitter<Category | Product>()

 @Input() updateCategoryModalIsOpen: boolean = false
 @Output() updateCategoryModalIsOpenState = new EventEmitter<boolean>()
 @Input() updateProductModalIsOpen: boolean = false
 @Output() updateProductModalIsOpenState = new EventEmitter<boolean>()

 @Output() categoryDeleted = new EventEmitter<void>(); 

  constructor(private adminProductService: AdminProductsService){} 


     public getSrcImage(element: Category | Product): string { 
      if (element.type === 'category') {
    return (element as Category).image;
  }

  return (element as Product).images[0];
    }

  public onDeleteElement(element: Category | Product) {
    const deleteConfirmation = confirm('¿Estás seguro de que quieres eliminar el elemento?');
   if (deleteConfirmation) {
   this.adminProductService.deleteElement(element.slug, element.type)
   this.categoryDeleted.emit()
  } else return
  }

  public openEditElementModal(element:  Category | Product) {
    this.editableElement = element
    this.updateEditableElement.emit(this.editableElement)
    if (element.type === 'category') {
      this.updateCategoryModalIsOpen = true
      this.updateCategoryModalIsOpenState.emit(this.updateCategoryModalIsOpen)
    } else {
      this.updateProductModalIsOpen = true
      console.log( 'emite el botón editar', this.updateProductModalIsOpen)
      this.updateProductModalIsOpenState.emit(this.updateProductModalIsOpen)
    }
    
  }

}
