import { Component, OnInit } from '@angular/core';
import { Product, Variant } from '../../models/data.models';
import { ActivatedRoute, Router } from '@angular/router';
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
import { map } from 'rxjs';
import { GoboRenderComponent } from '../../shared/gobo-render/gobo-render.component';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [ItemsCarouselComponent, CommonModule, ButtonComponent, PersonalizdorComponent, ImageCompareComponent, GoboRenderComponent, PricePipe],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css',
})
export class DetalleProductoComponent implements OnInit {
  public categoryName = '';
  public categoryLength = 0;
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
  public selectedVariant: Variant = {
      name: '' ,
    size: 0,
    price: 0,
  
  }
  
  finalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
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


const title = `${this.productSelectedData.name} · Rótulos Learoy`;
const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
 const description = this.productSelectedData.metaDescription;
          const image = this.productSelectedData.images[0];
          this.finalPrice = (this.productSelectedData.variants?.[0].price)  || 0 *10
          this.currentRoute = this.router.url;
  this.seoService.updateSeoDynamicTags(
            capitalizedTitle,
            description,
            image,
            this.currentRoute
          );
    this.schemaService.insertSchema(this.schemaService.getServiceSchema(capitalizedTitle, description, this.currentRoute, image), 'schema-service')

   this.getProductsService.getCategoryWithProductSlug(
            this.productSelectedData.slug).subscribe(
            (category) => {
              this.categoryName = category?.name ?? ''
            this.getProductsService.getProductsByCategory(category?.slug ?? '').pipe(
    map(products => products.length)
  )
  .subscribe(length => {
    this.categoryLength = length;
  });

            }
          );
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

  changePrice(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.finalPrice = Number(value);
}


public onAddToCart() {
   if (!this.productSelectedData.variants || !this.productSelectedData._id) return;

     const productPurchased = {
     id: this.productSelectedData._id,
    name: this.productSelectedData.name,
    image: this.productSelectedData.images[0],
    price: this.selectedVariant.price,
    variantName: this.selectedVariant.name,
    qty: 1,
  }

this.cartService.addToCart(productPurchased);
  this.router.navigate(['/cart']);
  }
}
