import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Category, Product } from '../../models/data.models';
import { GetProductsService } from '../../core/services/get-products.service';
import { SchemaService } from '../../core/services/schema.service';
import { AnimatedVerticalCarouselComponent } from '../../shared/animated-vertical-carousel/animated-vertical-carouesel.component';
import { TextsSectionComponent } from '../../shared/texts-section/texts-section.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CategoryCardsComponent } from '../../shared/category-cards/category-cards.component';
import { PlatformService } from '../../core/services/platform.service';
import { CardComponent } from '../../shared/card/card.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategoryCardsComponent,
    TextsSectionComponent,
    HomeCarouselComponent,
    CommonModule,
    AnimatedVerticalCarouselComponent,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public categories$?: Observable<Category[]>;
  public products$?: Observable<Product[]>;


  constructor(private router: Router, private getProductsService: GetProductsService, private schemaService: SchemaService, private platformService: PlatformService) {}

  public ngOnInit() {
    this.categories$ = this.getProductsService.getCategories();
    this.products$ =this.getProductsService.getAllProducts().pipe(
       map(products => products.filter(prod => prod.variants && prod.variants.length > 0))
    )
    this.schemaService.insertSchema(this.schemaService.getLocalBusinessSchema(),'schema-localbusiness')
    this.schemaService.insertSchema(this.schemaService.getWebSiteSchema(), 'schema-website')
  }

 public selectProduct(element: Product ) {
   const categorySlug$ = this.getProductsService.getCategoryWithProductSlug(element.slug)
categorySlug$.subscribe((category => this.router.navigateByUrl(`/${category?.slug}/${element.slug}`))) 
     }
}
