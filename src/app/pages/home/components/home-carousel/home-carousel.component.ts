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
public imagesSelected: string[] = [
'https://res.cloudinary.com/dxuseyfxa/image/upload/v1769692593/rotuloslearoy/sw5ophvfisop1qxt3vpw.webp',
'https://res.cloudinary.com/dxuseyfxa/image/upload/v1738167382/letras-de-metacrilato-retroiluminadas-rotulos-learoy_wuvwtd.webp',
'https://res.cloudinary.com/dxuseyfxa/image/upload/f_auto,q_auto/v1753955604/frase-luminosa-neon-learoy_s2250h.webp',
'https://res.cloudinary.com/dxuseyfxa/image/upload/v1738167179/rotulo-luminoso-metacrilato-learoy_eeuwtu.webp'
]

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





