import { Component, ElementRef, ViewChild } from '@angular/core';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { emailValidator } from '../../../../core/components/contact-form/validator';

@Component({
  selector: 'app-user-data-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-data-form.component.html',
  styleUrl: './user-data-form.component.css'
})
export class UserDataFormComponent {
    
  form: FormGroup = new FormGroup({
      name:  new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, emailValidator]),
      phone: new FormControl('', Validators.required),
      empresa: new FormControl(''),
      address:  new FormControl('', Validators.required),
      cp: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
    });

  @ViewChild('redsysForm') formEl!: ElementRef<HTMLFormElement>;

   constructor(private fb: FormBuilder,
    private checkoutService: CheckoutService, private cartService: CartService) {}


  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = ''


  public onSubmit() {
   if (this.form.invalid) return;
  

    const payload = {
  customer: this.form.value,
  items: [...this.cartService.items()]
  }

   
this.checkoutService.pagar(payload).subscribe({
  next: (data: any) => {
   
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
console.log('Payload en error:', payload);
  }
});


}

}
