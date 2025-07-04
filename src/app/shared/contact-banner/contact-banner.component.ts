import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-contact-banner',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './contact-banner.component.html',
  styleUrl: './contact-banner.component.css'
})
export class ContactBannerComponent {

}
