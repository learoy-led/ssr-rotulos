import { Component } from '@angular/core';
import { carouselImages } from '../../../../data/data';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';

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

  carouselImageChange(index:number) {
    this.imageIndex = index
  }

}
