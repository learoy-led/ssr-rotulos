import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/data.models';
import { Subscription } from 'rxjs';
import { GetProductsService } from '../../core/services/get-products.service';
import { ActivatedRoute } from '@angular/router';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-items-carousel',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './items-carousel.component.html',
  styleUrl: './items-carousel.component.css'
})
export class ItemsCarouselComponent implements OnInit, OnDestroy {

   public products: Product[] = [];
  public productsShown: Product[] = []
  public categorySlug: string = '';
 
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

      //aplicar el pipe filter
     
    this.categorySub = this.route.paramMap.subscribe(
      params => { 
        
        
        this.categorySlug = params.get('category') ?? ''


        if (this.categorySlug !== '') {
          this.productsSub = this.getProductsService.getCategoryBySlug(this.categorySlug).subscribe(
       (category) => {
        this.products = category.products
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
