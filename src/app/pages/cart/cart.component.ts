import { Component, computed } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ProductPurchased } from '../../models/data.models';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-cart',
  imports: [ButtonComponent, PricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  public isEmpty = computed(() => this.cartService.items().length === 0);

  constructor(public cartService: CartService) {}  


public onIncreaseQty(product: ProductPurchased) {
 this.cartService.addToCart({
    ...product,
    qty: 1 
  });
}

public onReduceQty(product: ProductPurchased) {
   if (product.qty > 1) {
    this.cartService.addToCart({
      ...product,
      qty: -1 // restas 1
    });
  } else {
    this.onRemoveItem(product.id);
  }
}

public onRemoveItem(id: string) {
  this.cartService.removeFromCart(id);
}
}

