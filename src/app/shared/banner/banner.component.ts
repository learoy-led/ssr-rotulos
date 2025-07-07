import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-banner',
      standalone: true,
    imports: [ButtonComponent],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css'
})
export class BannerComponent {
@Input() bannerTitle: string = '';
  @Input() bannerSubtitle: string = '';
  @Input() bannerImage: string = '';
  @Input() bannerAlt: string = '';
}
