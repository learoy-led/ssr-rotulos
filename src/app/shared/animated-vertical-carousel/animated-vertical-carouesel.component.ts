import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LetterImage } from '../../models/data.models';
import { letterImages } from '../../data/data';

@Component({
    selector: 'app-animated-vertical-carousel',
      standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './animated-vertical-carousel.component.html',
    styleUrl: './animated-vertical-carousel.component.css'
})
export class AnimatedVerticalCarouselComponent {

  public letterImages: LetterImage[] = letterImages

public letterImagesLeft: LetterImage[] = this.letterImages.slice(0,7)
public letterImagesMiddle: LetterImage[] = this.letterImages.slice(7,14)
public letterImagesRight: LetterImage[] = this.letterImages.slice(14,21)

}
