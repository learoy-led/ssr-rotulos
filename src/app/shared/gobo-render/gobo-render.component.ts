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

@Component({
  selector: 'app-gobo-render',
  imports: [FormsModule, CommonModule, PricePipe, IconComponent],
  templateUrl: './gobo-render.component.html',
  styleUrl: './gobo-render.component.css'
})
export class GoboRenderComponent implements OnInit {

   //está con logo sin fondo pero si lleva fondo cómo hacerle un círculo
  public goboImage: string ='/rotulos-learoy-logo.webp'

    @Input() product!: Product;

    public selectedVariant: Variant = { 
      name: 'lente 1 color',
      size: 0,
      price: 0 
    };
  
    public uploadPath: string = iconPaths.upload

  public errorMessage:string = ''
  private allowedTypes:string[] = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml']
  private maxSize:number = 2 * 1024 * 1024 //2MB
  

   constructor(private cartService: CartService, private router: Router, private platformService: PlatformService) {}

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

     public onFileSelected(event: Event) {
    
    if (!this.platformService.isBrowser()) return;
    

  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (!files || files.length === 0) return;

    this.errorMessage = '';
  
     const file = files.item(0);
  if (!file) return;


    if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Formato no permitido.';
      return;
    }

    if (file.size > this.maxSize) {
      this.errorMessage = 'El archivo no puede superar los 2MB.';
      return;
    }

     if (this.goboImage) {
    URL.revokeObjectURL(this.goboImage);
  }

  this.goboImage =  URL.createObjectURL(file);

}

}

  



