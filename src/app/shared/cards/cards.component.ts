import { Component, Input } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderPipe } from '../../pipes/order.pipe';
import { GetProductsService } from '../../core/services/get-products.service';
import { AltPipe } from '../../pipes/alt.pipe';


@Component({
    selector: 'app-cards',
      standalone: true,
    imports: [CommonModule, OrderPipe, AltPipe],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css'
})
export class CardsComponent {

   @Input() cardElements: (Category | Product)[] | null | undefined = [];
   @Input() cardsClass?: string = ''

  public srcImage: string = ''
  public cardClass: string = ''

  constructor(private router: Router, private getProductsService: GetProductsService) {}


  public selectElement(element: Category | Product ) {
   const categorySlug$ = this.getProductsService.getCategoryWithProductSlug(element.slug)
categorySlug$.subscribe((category => element.type === 'category' ? this.router.navigateByUrl(`/${element.slug}`) :  this.router.navigateByUrl(  `/${category?.slug}/${element.slug}`))) 
    }

    public getSrcImage(element: Category | Product): string { 
      if (element.type === 'category') {
    return (element as Category).image;
  }

  return (element as Product).images[0];
    }

    public getCardClass(element: Category | Product) {
      element.type === 'category' ? this.cardClass = 'category-card' : this.cardClass = 'product-card'
      return this.cardClass
    }

   

}
