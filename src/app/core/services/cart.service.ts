import { computed, Injectable, signal } from '@angular/core';
import { CustomDetails, ProductPurchased } from '../../models/data.models';
import { PlatformService } from './platform.service';
import _  from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public items = signal<ProductPurchased[]>([]);

  public totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  constructor(private platformService: PlatformService) {
     this.items.set(this.loadCart());
  }

public loadCart() {
    if (!this.platformService.isBrowser()) return [];
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

  private saveCart() {
    if (!this.platformService.isBrowser()) return;
    localStorage.setItem('cart', JSON.stringify(this.items()));
  }


  public addToCart(product: ProductPurchased) {
    
   const current = this.items();
    const items = [...current];

    const existing  = items.find(p => 
      p.id === product.id && _.isEqual(this.normalize(p.customDetails), this.normalize(product.customDetails))
    )

    existing ? existing.qty += product.qty : items.push(product);
     this.items.set(items);
    this.saveCart();    
    
  }

  public removeFromCart(product: ProductPurchased) {

  const filtered = this.items().filter(p =>
    !(
      p.id === product.id &&
      _.isEqual(
        this.normalize(p.customDetails),
        this.normalize(product.customDetails)
      )
    )
  );

  this.items.set(filtered);
  this.saveCart();
}

  public clearCart() {
    this.items.set([]);

    if (this.platformService.isBrowser()) {
      localStorage.removeItem('cart');
    }
  }
 

  private normalize = (details?: CustomDetails) => {
  if (!details) return details;

  const { svgString, ...rest } = details;
  return rest;
};

}