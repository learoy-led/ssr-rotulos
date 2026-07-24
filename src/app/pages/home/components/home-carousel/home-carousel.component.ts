import { Component } from '@angular/core';
// import { carouselImages } from '../../../../data/data';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-home-carousel',
      standalone: true,
    imports: [ButtonComponent, CommonModule],
    templateUrl: './home-carousel.component.html',
    styleUrl: './home-carousel.component.css'
})
export class HomeCarouselComponent {

//public imageIndex:number = 0
//public carouselImages: string[] = carouselImages

public letras: string[] = ['metacrilato', 'PVC', 'neón', 'hierro']

}





