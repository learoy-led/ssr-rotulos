import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ItemsCarouselComponent } from '../../shared/items-carousel/items-carousel.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { GetProductsService } from '../../core/services/get-products.service';
import { LoadingService } from '../../core/services/loading.service';
import { PlatformService } from '../../core/services/platform.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [ItemsCarouselComponent, CommonModule, ButtonComponent],
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
    metaDescription: '',
  };
  public mainImageIndex = 0;
  public productDetailsIndex = 0;
  public imagePrefix: string = IMAGEPREURL;
  public imageAlts: string[] = [];
  private currentRoute = '';
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private getProductsService: GetProductsService,
    private loadingService: LoadingService,
    private platformService: PlatformService
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const categorySlug = params.get('category') ?? '';
      const productSlug = params.get('product') ?? '';
      this.currentRoute = `${categorySlug}/${productSlug}`;

      this.getProductsService
        .getProductBySlug(productSlug)
        .subscribe((product) => {
          this.productSelectedData = product;
          this.imageAlts = this.productSelectedData.images.map((img) =>
            this.getImageAlt(img)
          );

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
          const image = this.imagePrefix + this.productSelectedData.images[0];
          this.seoService.updateSeoDynamicTags(
            capitalizedTitle,
            description,
            image,
            this.currentRoute
          );
        });
    });
    if (this.platformService.isBrowser()) {
      this.listenLoading();
    }
  }

  public updateProductDetails(index: number) {
    this.mainImageIndex = index;
  }

  public getImageAlt(img: string) {
    return (
      img.split('/').pop()?.split('.')[0].split('_')[0] || 'Rótulo publicitario'
    );
  }

  public listenLoading() {
    this.loadingService.getLoadingStatus().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
