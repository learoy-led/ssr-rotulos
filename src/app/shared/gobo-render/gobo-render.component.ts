import { Component, Input, OnInit } from '@angular/core';
import {  Product, Variant } from '../../models/data.models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';
import { PlatformService } from '../../core/services/platform.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-gobo-render',
  imports: [FormsModule, CommonModule, PricePipe, IconComponent],
  templateUrl: './gobo-render.component.html',
  styleUrl: './gobo-render.component.css'
})
export class GoboRenderComponent implements OnInit {

  public goboImage: string = '/rotulos-learoy-logo.webp';
  
  private currentObjectUrl? : string

    @Input() product!: Product;

    public selectedVariant: Variant = { 
      name: 'lente 1 color',
      size: 0,
      price: 0 
    };
  
    public uploadPath: string = iconPaths.upload

  public errorMessage:string = ''
  private allowedTypes:string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf']
  private maxSize:number = 2 * 1024 * 1024 //2MB
  

   constructor(private cartService: CartService, private router: Router, private platformService: PlatformService,  private pdfService: PdfService) {}

   ngOnInit() {
    if (this.product?.variants?.length) {
      this.selectedVariant = this.product.variants.find(v => v.name === 'lente 1 color') || this.product.variants[0];
}
  }

   public onAddToCart() { 
     if (!this.product.variants || !this.product._id) return;
     
  const productPurchased = {
     id: this.product._id,
    name: this.product.name,
    image: this.product.images[0],
    price: this.selectedVariant.price,
    variantName: this.selectedVariant.name,
    qty: 1,
  }
  this.cartService.addToCart(productPurchased)
  this.router.navigate(['/cart']);
  } 

     public async onFileSelected(event: any) {

      if (!this.platformService.isBrowser() || typeof window === 'undefined') return;

      const file: File = event.target.files[0];
  if (!file) return;

  this.errorMessage = '';

      if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Formato no permitido.';
      return;
    }

        if (file.size > this.maxSize) {
      this.errorMessage = 'El archivo no puede superar los 2MB.';
      return;
    }

     if (this.currentObjectUrl) {
    URL.revokeObjectURL(this.currentObjectUrl);
    this.currentObjectUrl = undefined;
  }

  if (file.type === 'application/pdf') {
    this.goboImage = await this.pdfService.pdfToImage(file);
  
  } else {
    this.currentObjectUrl = URL.createObjectURL(file);
    this.goboImage = this.currentObjectUrl;
  }

}

public onVariantChange(variant: Variant) {
 this.selectedVariant = variant;

  if (variant.name === 'lente 1 color') {
    this.goboImage =  '/rotulos-learoy-logo.webp'
  }
 if (variant.name === 'lente 2 colores') {
  this.goboImage = '/proyeccion-logo-2-colores-rotulos-learoy.webp'
  }
  if (variant.name === 'lente 3 colores') {
  this.goboImage = '/proyeccion-logo-3-colores-rotulos-learoy.webp'
  }

}

}

  



