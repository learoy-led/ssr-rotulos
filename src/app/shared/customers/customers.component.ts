import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';
import { PlatformService } from '../../core/services/platform.service';

@Component({
  selector: 'app-customers',
  imports: [IconComponent, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements AfterViewInit, OnDestroy{

  public customerLogos = [
    'cliente-1',
    'cliente-2',
    'cliente-3',
    'cliente-4',
    'cliente-5',
    'cliente-6',
    'cliente-7',
    'cliente-8',
    'cliente-9',
    'cliente-10',

  ]

public currentIndex:number = 0
  customerLogosShown: string[] = this.customerLogos.slice(this.currentIndex,this.currentIndex + 5) 
  

public leftArrow = iconPaths.leftArrow
 public rightArrow = iconPaths.rightArrow


  public hideCarouselNextArrow: boolean = false
  public hideCarouselPrevArrow: boolean = true

  private carouselInterval: any;

  public isMoving:boolean=false

constructor(
    private platformService: PlatformService,
  ) {}

ngAfterViewInit() {
  if (this.platformService.isBrowser()) {
  this.startCarouselAutoPlay();
}
}

startCarouselAutoPlay() {
  this.carouselInterval = setInterval(() => {
    this.carouselNextElements();
  }, 3000);
}

ngOnDestroy() {
  clearInterval(this.carouselInterval);
}

carouselNextElements() { 
 
  if (this.isMoving) return;

  this.isMoving = true;

  setTimeout(() => {

    const total = this.customerLogos.length;

    this.currentIndex =
      (this.currentIndex + 1) % total;

    this.updateCarouselShown();

    this.isMoving = false;

  }, 700);
}


carouselPrevElements() {
  const total = this.customerLogos.length;

  this.currentIndex = (this.currentIndex - 1 + total) % total;

  this.updateCarouselShown();
}


private updateCarouselShown() {
  const total = this.customerLogos.length;
  const visibleItems = Math.min(6, total);

  this.customerLogosShown = Array.from(
    { length: visibleItems },
    (_, i) => this.customerLogos[(this.currentIndex + i) % total]
  );
}
 //carouselNextElements() {
  //this.currentIndex < this.customerLogos.length - 5 ?  this.currentIndex =  this.currentIndex + 1 :  this.currentIndex = 0;
  //this.customerLogosShown = this.customerLogos.slice(this.currentIndex,this.currentIndex + 5)
  //this.hideCarouselPrevArrow = false
  //if (this.currentIndex  > this.customerLogos.length - 5 ) { this.hideCarouselNextArrow = true
  //}
  //}


  //carouselPrevElements() {
    //this.currentIndex > 0 ? this.currentIndex = this.currentIndex - 1 : this.currentIndex = this.customerLogos.length;
   // this.currentIndex > 0 ? this.customerLogosShown = this.customerLogos.slice(this.currentIndex,this.currentIndex + 5) : this.customerLogosShown = this.customerLogos.slice(this.currentIndex,this.currentIndex +5)
    //if (this.currentIndex  < 5 ) {
      //this.hideCarouselPrevArrow = true
      //this.hideCarouselNextArrow = false
    //}  
  //}

}
