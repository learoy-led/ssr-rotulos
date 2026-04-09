import { Component } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor(private checkoutService: CheckoutService) {}

  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = ''

  public onSubmit(form: NgForm) {
this.checkoutService.pagar().subscribe((data: any) => {
this.signatureVersion = data.signatureVersion
this.merchantParameters = data.merchantParameters
this.redirectUrl = data.redirectUrl
})
form.ngSubmit;
}

}
