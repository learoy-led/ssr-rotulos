import { Component, ElementRef, ViewChild } from '@angular/core';
import { carouselImages } from '../../../../data/data';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../../core/services/platform.service';


@Component({
    selector: 'app-home-carousel',
      standalone: true,
    imports: [ButtonComponent, CommonModule],
    templateUrl: './home-carousel.component.html',
    styleUrl: './home-carousel.component.css'
})
export class HomeCarouselComponent {

  public imageIndex:number = 0
public carouselImages: string[] = carouselImages

public letras: string[] = ['metacrilato', 'PVC', 'neón', 'hierro']


@ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;
constructor(private platformService: PlatformService) {}
 

  carouselImageChange(index:number) {
    this.imageIndex = index
  }

   public ngAfterViewInit() {
    if (this.platformService.isBrowser()) {
         const video = this.videoEl.nativeElement;
    video.muted = true;
    video.play().catch(err => {
      console.warn('Autoplay bloqueado por el navegador:', err);
    });
   }
  
  }
}





