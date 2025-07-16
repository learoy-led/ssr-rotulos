import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from '../../models/data.models';
import { GetProductsService } from '../../core/services/get-products.service';
import { AnimatedVerticalCarouselComponent } from '../../shared/animated-vertical-carousel/animated-vertical-carouesel.component';
import { ItemsCarouselComponent } from '../../shared/items-carousel/items-carousel.component';
import { TextsSectionComponent } from '../../shared/texts-section/texts-section.component';
import { ContactBannerComponent } from '../../shared/contact-banner/contact-banner.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CategoryCardsComponent } from '../../shared/category-cards/category-cards.component';

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
        ButtonComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public categories$?: Observable<Category[]>;  
 
  constructor(
    private getProductsService: GetProductsService,
  ) {}

  public ngOnInit() {
    this.categories$ = this.getProductsService.getCategories();
  }

}