import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { CartService } from '../../../core/services/cart.service';
import { OrdersService } from '../../../services/orders.service';


@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {


constructor(private ordrsService: OrdersService, private route: ActivatedRoute, private seoService: SeoService, private cartService: CartService
){ this.initEffect()} 


ngOnInit() {    
    
   this.seoService.noRobots();
   
   this.route.queryParams.subscribe(params => {
    const orderId = params['orderId'];
        if (!orderId) return;
    this.ordrsService.getOrderById(orderId)
  });

  
  }

 private initEffect() {
    effect(() => {
      const status = this.ordrsService.orderStatus();

      if (status === 'paid') {
        this.cartService.clearCart();
      }
    });
  }
      
    
}
