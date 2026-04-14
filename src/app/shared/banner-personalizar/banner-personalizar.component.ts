import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-personalizar',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './banner-personalizar.component.html',
  styleUrl: './banner-personalizar.component.css'
})
export class BannerPersonalizarComponent {

}
