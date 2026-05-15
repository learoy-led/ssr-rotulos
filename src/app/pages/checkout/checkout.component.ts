import { Component, OnInit } from '@angular/core';
import { OrderSummaryComponent } from '../../shared/order-summary/order-summary.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent, UserDataFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private seoService: SeoService){} 

  ngOnInit() {    
 this.seoService.noRobots();
}
}
