import { Component, OnInit } from '@angular/core';
import { Product, Variant } from '../../models/data.models';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ItemsCarouselComponent } from '../../shared/items-carousel/items-carousel.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { GetProductsService } from '../../core/services/get-products.service';
import { LoadingService } from '../../core/services/loading.service';
import { PlatformService } from '../../core/services/platform.service';
import { SchemaService } from '../../core/services/schema.service';
import { PersonalizdorComponent } from '../../shared/personalizdor/personalizdor.component';
import { CartService } from '../../core/services/cart.service';
import { ImageCompareComponent } from './components/image-compare/image-compare.component';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [ItemsCarouselComponent, CommonModule, ButtonComponent, PersonalizdorComponent, ImageCompareComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css',
})
export class DetalleProductoComponent implements OnInit {
  public categoryName = '';
  public productSelectedData: Product = {
    type: '',
    name: '',
    slug: '',
    description: '',
    material: '',
    images: [],
    design: '',
    installation: '',
    application: '',
    light: false,
    metaDescription: '',
    renderKey: '',
    categories: [],
    _id: '',
  };
  public mainImageIndex = 0;
  public productDetailsIndex = 0;
  private currentRoute = '';
  public isLoading: boolean = true;
  public variantSelected: Variant = {
    size: 0,
    price: 0 
  }
  

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private getProductsService: GetProductsService,
    private loadingService: LoadingService,
    private platformService: PlatformService,
    private schemaService: SchemaService,
    private cartService: CartService
  ) {}

  public ngOnInit() {

    this.route.data.subscribe(data => {
    this.productSelectedData = data['product'];
console.log('imagenes array', this.productSelectedData.images.length)
});


    this.route.paramMap.subscribe((params) => {
      const categorySlug = params.get('category') ?? '';
      const productSlug = params.get('product') ?? '';
      this.currentRoute = `${categorySlug}/${productSlug}`;

          const category$ = this.getProductsService.getCategoryWithProductSlug(
            this.productSelectedData.slug
          );
          category$.subscribe(
            (category) => (this.categoryName = category ? category.name : '')
          );

          const title = `${this.productSelectedData.name} · Rótulos Learoy`;
          const capitalizedTitle =
            title.charAt(0).toUpperCase() + title.slice(1);
          const description = this.productSelectedData.metaDescription;
          const image = this.productSelectedData.images[0];
          this.seoService.updateSeoDynamicTags(
            capitalizedTitle,
            description,
            image,
            this.currentRoute
          );
          this.schemaService.insertSchema(this.schemaService.getServiceSchema(capitalizedTitle, description, this.currentRoute, image), 'schema-service')
        });
  
    if (this.platformService.isBrowser()) {
      this.listenLoading();
    }
  }

  public updateProductDetails(index: number) {
    this.mainImageIndex = index;
  }

  public listenLoading() {
    this.loadingService.getLoadingStatus().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

//  ver si se añade al botón
//  public onAddToCart() {
// this.productSelectedData._id && this.cartService.addToCart({
//     id: this.productSelectedData._id,
//     name: this.productSelectedData.name,
//     image: this.productSelectedData.images[0],
//     variant: this.variantSelected,
//     qty: 1
//   });
//   }
}
