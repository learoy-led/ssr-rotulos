import { Component } from '@angular/core';
import { OrderSummaryComponent } from '../../shared/order-summary/order-summary.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent, UserDataFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {


}
