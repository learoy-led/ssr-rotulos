import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { GetProductsService } from '../../core/services/get-products.service';
import { Product } from '../../models/data.models';
import { Observable } from 'rxjs';
import { CardsComponent } from '../../shared/cards/cards.component';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, FilterPipe, CardsComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{

public products$?: Observable <Product[]>;

  public productSearch: string = ''

constructor(private getProductsService: GetProductsService, private route: ActivatedRoute, private seoService: SeoService){} 

  ngOnInit() {    
    
   this.seoService.noRobots();
    
   this.products$ = this.getProductsService.getAllProducts()
   
   this.route.queryParams.subscribe(params => {
    const searchValue = params['q'] ?? '';
      this.productSearch = searchValue
  });

  }
 
}
