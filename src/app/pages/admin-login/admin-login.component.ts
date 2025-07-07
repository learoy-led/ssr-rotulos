import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminFormData } from '../../models/data.models';
import { AdminLoginService } from '../../services/admin-login.service';
import { emailValidator } from '../../core/components/contact-form/validator';

@Component({
    selector: 'app-admin-login',
      standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit, OnDestroy {

   public adminLoginMessage: string = '';
  public adminLoginMessageSubscription: Subscription = new Subscription();
  public adminData: AdminFormData = {
    email: '',
    password: '',
  };

  constructor(private adminLoginService: AdminLoginService) {}

  ngOnInit() {

  this.adminLoginMessageSubscription = this.adminLoginService.getSubmittedMessage().subscribe(message => {
    if (message) {
      this.adminLoginMessage = message;
    }
  });
}

  public emailValidator = emailValidator;

  public onSubmit() {
    this.adminLoginService.adminLogin(this.adminData);
  }

  ngOnDestroy() {
    this.adminLoginService.completeSubmittedMessage();
    this.adminLoginMessageSubscription.unsubscribe();
  }
}
