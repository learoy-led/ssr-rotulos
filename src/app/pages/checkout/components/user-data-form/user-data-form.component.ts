import { Component, ElementRef, ViewChild } from '@angular/core';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { emailValidator } from '../../../../core/components/contact-form/validator';
import { PlatformService } from '../../../../core/services/platform.service';

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
      address:  new FormControl('', Validators.required),
      cp: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      invoice: new FormControl(false),
      razon: new FormControl(''),
       cif: new FormControl(''),
       invoiceAddress:  new FormControl(''),
      invoiceCp: new FormControl(''),
      invoiceCiudad: new FormControl(''),
      invoiceProvincia: new FormControl(''),

    });

  @ViewChild('redsysForm') formEl!: ElementRef<HTMLFormElement>;


   constructor(private fb: FormBuilder,
    private checkoutService: CheckoutService, private cartService: CartService, private platformService: PlatformService) {}


  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = '';
  public paying: boolean = false;

ngOnInit(): void {
  this.form.get('invoice')?.valueChanges.subscribe(checked => {
    const invoiceFields = [
      'razon',
      'cif',
      'invoiceAddress',
      'invoiceCp',
      'invoiceCiudad',
      'invoiceProvincia'
    ];

    invoiceFields.forEach(field => {
      const control = this.form.get(field);

      if (checked) {
        control?.addValidators(Validators.required);
      } else {
        control?.removeValidators(Validators.required);
      }

      control?.updateValueAndValidity();
    });
  });
}

  public onSubmit() {
  
    if (!this.platformService.isBrowser() || this.form.invalid || this.paying) return;

 this.paying = true;

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
      
         const form = this.formEl.nativeElement;
          if (!form) {
      console.error('NO EXISTE REDSYS FORM');
      return;
    }

   form.submit();
 

    });
  },

  error: (err) => {
    console.error('Error en pago:', err);
  }
});


}

}
