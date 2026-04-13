import { Component } from '@angular/core';
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

  public productsPurchaded: ProductPurchased[] = []
  public totalPrice: number = 0

  constructor(private cartService: CartService) {}

  public ngOnInit() {
  this.productsPurchaded = this.cartService.getCart()
}

}
