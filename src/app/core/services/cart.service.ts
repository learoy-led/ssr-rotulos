import { Injectable } from '@angular/core';
import { ProductPurchased, Variant } from '../../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   private items: ProductPurchased[] = [];

  public addToCart(product: ProductPurchased) {
    const existing = this.items.find(p => p.id === product.id);
    existing ? existing.qty += product.qty : this.items.push(product);
  }

  public getCart() {
    return this.items;
  }

  public removeFromCart(id: string) {
    this.items = this.items.filter(p => !(p.id === id));
  }

  public clearCart() {
    this.items = [];
  }
}
