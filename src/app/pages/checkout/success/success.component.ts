import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { CartService } from '../../../core/services/cart.service';
import { OrdersService } from '../../../services/orders.service';
import { GoboStorageService } from '../../../services/gobo-storage.service';
import { Order } from '../../../models/data.models';
import { firstValueFrom } from 'rxjs';
import { PlatformService } from '../../../core/services/platform.service';


@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {

private orderId: string = ''
 
  
constructor(private orderService: OrdersService, private route: ActivatedRoute, private seoService: SeoService, private cartService: CartService,
  private goboStorageService: GoboStorageService, private platformService: PlatformService
){ this.initEffect()} 


ngOnInit() {    
   this.seoService.noRobots();
   
   this.route.queryParams.subscribe(params => {
    this.orderId = params['orderId'];
        if (!this.orderId) return;
    this.orderService.getOrderById(this.orderId)
  });
  }

 private initEffect() {
    effect(async () => {
      const order = this.orderService.order();
      if (!order || order.status !== 'paid') return;

    const success =  await this.processGobos(order);
      if (success) {
        this.cartService.clearCart();
    };
    });
  }
      

  private async processGobos(order: Order): Promise<boolean>  {

     const goboItems = order.items.filter(item =>
    item.name.toLowerCase().includes('proyector') &&
    item.goboDetails
  );

   if (!goboItems.length) {
    return true;
  }

  for (const item of goboItems) {

    const goboDetails = item.goboDetails!;


     if (this.platformService.isBrowser()) {
        
       try {

      

      const file = await this.goboStorageService.getFile(
        goboDetails.goboFileKey
      );

      if (!file) {
        console.error(
          'No se encontró el archivo Gobo en IndexedDB:',
          goboDetails.goboFileKey
        );
  return false
      }
        await firstValueFrom(
      this.orderService.uploadGobo(this.orderId, item._id!, file)
 );
  await this.goboStorageService.deleteFile(
        goboDetails.goboFileKey
      );
    } catch (error) {

      console.error('Error recuperando Gobo:', error);
      return false
    }
                
}

   
  }
  return true
}
  
    
}
