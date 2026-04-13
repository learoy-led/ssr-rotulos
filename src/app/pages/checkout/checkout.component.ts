import { Component } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout.service';
import { FormsModule, NgForm } from '@angular/forms';
import { emailValidator } from '../../core/components/contact-form/validator';
import { CheckOutFormData } from '../../models/data.models';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

public checkoutFormData: CheckOutFormData = {
    name: '',
    email: '',
    phone: '',
    empresa: '',
      address: '',
    cp: '',
     ciudad: '',
     provincia: ''
  };

   constructor(private checkoutService: CheckoutService) {}

   
  public emailValidator = emailValidator;

  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = ''

  public onSubmit(form: NgForm) {
//this.SendEmailService.sendEmail(this.formData);
this.checkoutService.pagar().subscribe((data: any) => {
this.signatureVersion = data.signatureVersion
this.merchantParameters = data.merchantParameters
this.redirectUrl = data.redirectUrl
})
form.ngSubmit;
}

}
