import { Component, ElementRef, ViewChild } from '@angular/core';
import { CheckOutFormData } from '../../../../models/data.models';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { emailValidator } from '../../../../core/components/contact-form/validator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-user-data-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-data-form.component.html',
  styleUrl: './user-data-form.component.css'
})
export class UserDataFormComponent {

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

   constructor(private checkoutService: CheckoutService, private cartService: CartService) {}

   
  public emailValidator = emailValidator;

  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = ''


  
  @ViewChild('redsysForm') formEl!: ElementRef<HTMLFormElement>;

  get isFormValid(): boolean {
  const f = this.checkoutFormData;

  return!! (
    f.name &&
    f.email &&
    f.phone &&
    f.address &&
    f.cp &&
    f.ciudad &&
    f.provincia
  );
}

  public onSubmit() {
   if (!this.isFormValid) return;
  

    const payload = {
  customer: this.checkoutFormData,
  items: [...this.cartService.items()]
  }

   console.log('PAYLOAD 1', payload)

//this.SendEmailService.sendEmail(this.checkoutFormData);
this.checkoutService.pagar(payload).subscribe({
  next: (data: any) => {
    console.log('PAYLOAD 2', payload)
    this.signatureVersion = data.signatureVersion;
    this.merchantParameters = data.merchantParameters;
    this.signature = data.signature;
    this.redirectUrl = data.redirectUrl;

    requestAnimationFrame(() => {
      this.formEl.nativeElement.submit();
    });
  },

  error: (err) => {
    console.error('Error en pago:', err);
//    window.location.href = '/checkout/error';
    
console.error('Checkout error:', err);
console.log('Payload en error:', payload);
  }
});


}

}
