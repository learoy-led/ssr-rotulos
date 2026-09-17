import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';

@Component({
  selector: 'app-customers',
  imports: [NgOptimizedImage, IconComponent, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  public customerLogos = [
    'cliente(1)',
    'cliente(2)'

  ]

  customerLogosShown: string[] = []
  

public leftArrow = iconPaths.leftArrow
 public rightArrow = iconPaths.rightArrow

 public currentIndex:number = 0
  public hideCarouselNextArrow: boolean = false
  public hideCarouselPrevArrow: boolean = true


 carouselNextElements() {
  this.currentIndex < this.customerLogos.length - 5 ?  this.currentIndex =  this.currentIndex + 5 :  this.currentIndex = 0;
  this.customerLogosShown = this.customerLogos.slice(this.currentIndex,this.currentIndex + 5)
  this.hideCarouselPrevArrow = false
  if (this.currentIndex  > this.customerLogos.length - 5 ) { this.hideCarouselNextArrow = true
  }
  }


  carouselPrevElements() {
    this.currentIndex > 0 ? this.currentIndex = this.currentIndex - 5 : this.currentIndex = 0;
    this.customerLogosShown = this.customerLogos.slice(this.currentIndex,this.currentIndex + 5)
    if (this.currentIndex  < 5 ) {
      this.hideCarouselPrevArrow = true
      this.hideCarouselNextArrow = false
    }  
  }

}
