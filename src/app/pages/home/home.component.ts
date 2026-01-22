import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from '../../models/data.models';
import { GetProductsService } from '../../core/services/get-products.service';
import { SchemaService } from '../../core/services/schema.service';
import { AnimatedVerticalCarouselComponent } from '../../shared/animated-vertical-carousel/animated-vertical-carouesel.component';
import { ItemsCarouselComponent } from '../../shared/items-carousel/items-carousel.component';
import { TextsSectionComponent } from '../../shared/texts-section/texts-section.component';
import { ContactBannerComponent } from '../../shared/contact-banner/contact-banner.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CategoryCardsComponent } from '../../shared/category-cards/category-cards.component';
import { PlatformService } from '../../core/services/platform.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContactBannerComponent,
    CategoryCardsComponent,
    TextsSectionComponent,
    HomeCarouselComponent,
    ItemsCarouselComponent,
    CommonModule,
    AnimatedVerticalCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  public categories$?: Observable<Category[]>;

  constructor(private getProductsService: GetProductsService, private schemaService: SchemaService, private platformService: PlatformService) {}

  public ngOnInit() {
    this.categories$ = this.getProductsService.getCategories();
    this.schemaService.insertSchema(this.schemaService.getLocalBusinessSchema(),'schema-localbusiness')
    this.schemaService.insertSchema(this.schemaService.getWebSiteSchema(), 'schema-website')
  }

  //ver si esto va en otraa pág
  public ngAfterViewInit() {
    if(this.platformService.isBrowser()){
const instagramScript = document.createElement('script');
  instagramScript.src = "https://www.instagram.com/embed.js";
  instagramScript.async = true;
  document.body.appendChild(instagramScript);
  
  const tiktokScript = document.createElement('script');
   tiktokScript.src = "https://www.tiktok.com/embed.js";
  tiktokScript.async = true;
  document.body.appendChild(tiktokScript);
    }
}
}
