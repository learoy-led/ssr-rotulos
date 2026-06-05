import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/data.models';
import { ImagesService } from '../../services/images.service';

@Component({
    selector: 'app-animated-vertical-carousel',
      standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './animated-vertical-carousel.component.html',
    styleUrl: './animated-vertical-carousel.component.css'
})
export class AnimatedVerticalCarouselComponent implements OnInit {

  public letterImages: Image[] = []

public letterImagesLeft: Image[] = []
public letterImagesMiddle: Image[] = []
public letterImagesRight: Image[] = []

constructor(private imagesService: ImagesService
  ) {}

  ngOnInit() {
this.imagesService.getImages().subscribe(images => {
 this.letterImages =  images.filter(img => img.location === 'Carrusel letras');
  
  this.letterImagesLeft = this.letterImages.slice(0,7)
   this.letterImagesMiddle = this.letterImages.slice(7,14)
    this.letterImagesRight = this.letterImages.slice(14,21)

    })
  }

}
