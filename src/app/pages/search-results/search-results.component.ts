import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { GetProductsService } from '../../core/services/get-products.service';
import { Category, Product } from '../../models/data.models';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, FilterPipe, CardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{

public products$?: Observable <Product[]>;
public productSearch: string = ''

constructor(private getProductsService: GetProductsService, private route: ActivatedRoute, private seoService: SeoService,
  private router: Router
){} 

  ngOnInit() {    
    
   this.seoService.noRobots();
    
   this.products$ = this.getProductsService.getAllProducts()
   
   this.route.queryParams.subscribe(params => {
    const searchValue = params['q'] ?? '';
      this.productSearch = searchValue
  });

  }

  public selectProduct(element: Product | Category) {
   const categorySlug$ = this.getProductsService.getCategoryWithProductSlug(element.slug)
categorySlug$.subscribe((category => this.router.navigateByUrl(`/${category?.slug}/${element.slug}`))) 
     }
 
}
