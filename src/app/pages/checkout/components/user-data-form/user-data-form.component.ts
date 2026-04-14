import { Component, ElementRef, ViewChild } from '@angular/core';
import { CheckOutFormData } from '../../../../models/data.models';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { emailValidator } from '../../../../core/components/contact-form/validator';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

   constructor(private checkoutService: CheckoutService) {}

   
  public emailValidator = emailValidator;

  public signature!: string;
  public signatureVersion!: string;
  public merchantParameters!: string;
  public redirectUrl: string = ''
  
  @ViewChild('formEl') formEl!: ElementRef<HTMLFormElement>;

  public onSubmit(form: NgForm) {
     if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

//this.SendEmailService.sendEmail(this.formData);
this.checkoutService.pagar(this.checkoutFormData).subscribe((data: any) => {
this.signatureVersion = data.signatureVersion
this.merchantParameters = data.merchantParameters
this.signature = data.signature;
this.redirectUrl = data.redirectUrl

setTimeout(() => {
      this.formEl.nativeElement.submit();
    });

})


}

}
