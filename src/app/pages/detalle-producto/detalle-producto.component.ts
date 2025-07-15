import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from '../../core/services/get-products.service';
import { SeoService } from '../../core/services/seo.service';
import { ItemsCarouselComponent } from "../../shared/items-carousel/items-carousel.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

@Component({
    selector: 'app-detalle-producto',
      standalone: true,
    imports: [ItemsCarouselComponent, CommonModule, ButtonComponent, NotFoundComponent],
    templateUrl: './detalle-producto.component.html',
    styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {

  public categoryName = '';

  public productSelectedData: Product =  {
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
  }
  public mainImageIndex = 0
  public productDetailsIndex = 0
  public imagePrefix: string = IMAGEPREURL

constructor(private route: ActivatedRoute, private getProductsService: GetProductsService, private seoService:SeoService) {}


public ngOnInit() {

   this.route.paramMap.subscribe(params => {
    const categorySlug = params.get('category') ?? '';
    this.getProductsService.getCategoryBySlug(categorySlug).subscribe((category) =>   
      category? this.categoryName = category.name : this.categoryName = ''
  ); 
    const productSlug = params.get('product') ?? '';
    console.log(productSlug)
    this.getProductsService.getProductBySlug(productSlug).subscribe((product) =>  {
      this.productSelectedData = product;
      
     const title =  `${this.productSelectedData.name} · Rótulos Learoy`
 const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
        const description = this.productSelectedData.metaDescription
    const image = this.imagePrefix+this.productSelectedData.images[0]
  const route =`${categorySlug}/${productSlug}`
         this.seoService.updateSeoDynamicTags(capitalizedTitle, description, image, route)
  
  }); 
})
}

public updateProductDetails(index: number) {
  this.mainImageIndex = index
}
}
