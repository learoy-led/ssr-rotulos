import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductsService } from '../../core/services/get-products.service';
import { CommonModule } from '@angular/common';
import { OrderPipe } from '../../pipes/order.pipe';

@Component({
    selector: 'app-cards',
      standalone: true,
    imports: [CommonModule, OrderPipe],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

   @Input() cardElements: (Category | Product)[] | null = [];
   @Input() cardsClass?: string = ''
   @Input() categorySelectedSlug?: string = ''


  public srcImage: string = ''
  public imagePrefix: string = IMAGEPREURL
  public cardClass: string = ''
  public categorySlug: string = ''

  public categoriesSub: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private getProductsService: GetProductsService) {}

  public selectElement(element: Category | Product ) {
     element.type === 'category' ? this.router.navigateByUrl(`/${element.slug}`) :  this.router.navigateByUrl(  `/${this.categorySelectedSlug}/${element.slug}`) 
    }

    public getSrcImage(element: Category | Product) { 
      if (element.type === 'category' && (element as Category).products.length === 0) { return }
      element.type === 'category' ? this.srcImage = (element as Category).products[0].images[0] : this.srcImage = (element as Product).images[0]
      return this.srcImage
    }

    public getCardClass(element: Category | Product) {
      element.type === 'category' ? this.cardClass = 'category-card' : this.cardClass = 'product-card'
      return this.cardClass
    }

    public ngOnInit() {
      this.categorySlug = this.route.snapshot.params['category'];    
    }

}
