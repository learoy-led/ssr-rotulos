import { Component, computed, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ProductPurchased } from '../../models/data.models';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';
import { iconPaths } from '../../data/data';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cart',
  imports: [ButtonComponent, PricePipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public isEmpty = computed(() => this.cartService.items().length === 0);
  public binPath = iconPaths.bin

  getSvgSrc(svg: string): string {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}


  constructor(public cartService: CartService, private seoService: SeoService) {}  

    
      ngOnInit() {    
     this.seoService.noRobots();
    }


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

