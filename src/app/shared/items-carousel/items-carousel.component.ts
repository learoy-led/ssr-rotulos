import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/data.models';
import { Subscription } from 'rxjs';
import { GetProductsService } from '../../core/services/get-products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';

@Component({
    selector: 'app-items-carousel',
      standalone: true,
    imports: [CardComponent, RouterModule, IconComponent],
    templateUrl: './items-carousel.component.html',
    styleUrl: './items-carousel.component.css'
})
export class ItemsCarouselComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public productsShown: Product[] = []
  public categorySlug: string = '';
  public leftArrow: string = iconPaths.leftArrow
  public rightArrow: string = iconPaths.rightArrow
 
  public currentIndex:number = 0
  public hideCarouselNextArrow: boolean = false
  public hideCarouselPrevArrow: boolean = true

  private categorySub: Subscription = new Subscription();
  public productsSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private getProductsService: GetProductsService) {}


carouselNextElements() {
  this.currentIndex < this.products.length - 5 ?  this.currentIndex =  this.currentIndex + 5 :  this.currentIndex = 0;
  this.productsShown = this.products.slice(this.currentIndex,this.currentIndex + 5)
  this.hideCarouselPrevArrow = false
  if (this.currentIndex  > this.products.length - 5 ) { this.hideCarouselNextArrow = true
  }
  }


  carouselPrevElements() {
    this.currentIndex > 0 ? this.currentIndex = this.currentIndex - 5 : this.currentIndex = 0;
    this.productsShown = this.products.slice(this.currentIndex,this.currentIndex + 5)
    if (this.currentIndex  < 5 ) {
      this.hideCarouselPrevArrow = true
      this.hideCarouselNextArrow = false
    }  
  }

  public ngOnInit() {
     
    this.categorySub = this.route.paramMap.subscribe(
      params => { 
        
        this.categorySlug = params.get('category') ?? ''

        if (this.categorySlug !== '') {
          this.productsSub = this.getProductsService.getProductsByCategory(this.categorySlug).subscribe(
       (products) => { 
        this.products = products   
        this.productsShown = this.products.slice(this.currentIndex,this.currentIndex + 5)
       }
     )
          } else {
           this.productsSub = this.getProductsService.getAllProducts().subscribe(
             (products) => {
              this.products = products   
              this.productsShown = this.products.slice(this.currentIndex,this.currentIndex + 5)  
              }
            )
      }
    
      });
     
  } 

  public ngOnDestroy() {
    this.categorySub.unsubscribe()
    this.productsSub.unsubscribe()
  }

}
