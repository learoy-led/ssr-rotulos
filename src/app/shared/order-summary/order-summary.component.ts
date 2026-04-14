import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-order-summary',
  imports: [PricePipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  constructor(public cartService: CartService) {}

}
