import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-banner',
  imports: [],
  templateUrl: './video-banner.component.html',
  styleUrl: './video-banner.component.css'
})
export class VideoBannerComponent {

  @Input() title: string = '';
@Input() subtitle?: string;
@Input() description: string = '';


}
