import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CardsComponent } from "../../shared/cards/cards.component";
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../pipes/gender.pipe';

@Component({
    selector: 'app-detalle-categoria',
      standalone: true,
    imports: [CardsComponent, CommonModule, GenderPipe],
    templateUrl: './detalle-categoria.component.html',
    styleUrl: './detalle-categoria.component.css'
})
export class DetalleCategoriaComponent implements OnInit {

   public categorySelectedData: Category | null = {
    type: '',
    name: '',
    slug: '',
    products: [],
    description: {
      application: '',
      custom: '',
      cost: '',
      products: '',
      metaDescription: '',
    }
  }
  public imagePrefix: string = IMAGEPREURL


constructor(private route: ActivatedRoute, private seoService:SeoService) {}

public ngOnInit() {

  this.route.data.subscribe(data => {
    this.categorySelectedData = data['category'];
   
    //   this.route.paramMap.subscribe(params => {
    // const categorySlug = params.get('category') ?? '';
    // this.GetProductsService.getCategoryBySlug(categorySlug).subscribe((category)=>  {
    //   this.categorySelectedData = category

         const title =`${this.categorySelectedData?.name} · Rótulos Learoy`
         const description = this.categorySelectedData?.description.metaDescription
          const image = this.imagePrefix+this.categorySelectedData?.products[0].images[0];
          const slug = this.categorySelectedData?.slug ?? ''
 
          this.seoService.updateSeoDynamicTags(title, description??'', image, slug)
  
  }); 
  
}
}
