import { Component, Input } from '@angular/core';
import {  Product, Variant } from '../../models/data.models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-gobo-render',
  imports: [FormsModule, CommonModule, PricePipe],
  templateUrl: './gobo-render.component.html',
  styleUrl: './gobo-render.component.css'
})
export class GoboRenderComponent {

   //está con logo sin fondo pero si lleva fondo cómo hacerle un círculo
  public goboImage: string ='/frame_75.webp'

    @Input() product!: Product;

    public selectedVariant: Variant = { 
      name: 'lente 1 color',
      size: 0,
      price: 0 
    };
  

   constructor(private cartService: CartService, private router: Router) {}

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

  }
  



