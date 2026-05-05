import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CommonModule } from '@angular/common';
import { DownloadCatalogueComponent } from '../../shared/download-catalogue/download-catalogue.component';
import { SchemaService } from '../../core/services/schema.service';
import { GetProductsService } from '../../core/services/get-products.service';
import { map, Observable } from 'rxjs';
import { FilterButtonsComponent } from '../../shared/filter-buttons/filter-buttons.component';
import { CardComponent } from '../../shared/card/card.component';
import { FilterPipe } from '../../pipes/filter.pipe';


@Component({
  selector: 'app-detalle-categoria',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    DownloadCatalogueComponent,
    FilterButtonsComponent,
    RouterModule,
    FilterPipe
  ],
  templateUrl: './detalle-categoria.component.html',
  styleUrl: './detalle-categoria.component.css',
})
export class DetalleCategoriaComponent implements OnInit {
  public categorySelectedData: Category | null = {
    type: '',
    name: '',
    slug: '',
   image: '',
    description: {
      application: '',
      custom: '',
      cost: '',
      products: '',
      metaDescription: '',
    },
    _id: '',
  };
  public pdfCatalogueVisible?: boolean;
  public isLoading: boolean = true;
  //public products$?: Observable <Product[]>;
  public allProducts$!: Observable<Product[]>;
public productsShown$!: Observable<Product[]>;

    public itemSelected: string = ''
 

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private schemaService: SchemaService,
    private getProductsService: GetProductsService
  ) 
  {}

  public ngOnInit() {
    this.route.data.subscribe(data => {
    this.categorySelectedData = data['category'];

          const title = `${this.categorySelectedData?.name} · Rótulos Learoy`;
          const description =
            this.categorySelectedData?.description.metaDescription;
          const image = this.categorySelectedData?.image;
          const slug = this.categorySelectedData?.slug ?? '';
  
          this.allProducts$ = this.getProductsService.getProductsByCategory(slug)
          this.productsShown$  =  this.allProducts$

          this.seoService.updateSeoDynamicTags(
            title,
            description ?? '',
            image ?? '',
            slug
          );
          this.schemaService.insertSchema(this.schemaService.getServiceSchema(title, description ?? '', slug, image ?? ''), 'schema-service')
          this.pdfCatalogueVisible =
            this.categorySelectedData?.slug === 'letras-corporeas';

        });
    //});
    // if (this.platformService.isBrowser()) {
    //   this.listenLoading();
    // }
  }

  // public listenLoading() {
  //   this.loadingService.getLoadingStatus().subscribe((isLoading) => {
  //     this.isLoading = isLoading;
  //   });
  // }

  public onItemSelectedChange(item: string) {
this.itemSelected = item;
if (item === '') {
  this.productsShown$ = this.allProducts$
  return
}

this.productsShown$ = this.allProducts$?.pipe(
  map(products => 
  item === 'Rótulos luminosos' ? products.filter(product => product.light) : products.filter(product => !product.light)
))
  
}

}