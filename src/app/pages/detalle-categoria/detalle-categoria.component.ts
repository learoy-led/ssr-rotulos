import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CardsComponent } from "../../shared/cards/cards.component";
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../pipes/gender.pipe';
import { DownloadCatalogueComponent } from '../../shared/download-catalogue/download-catalogue.component';

@Component({
    selector: 'app-detalle-categoria',
      standalone: true,
    imports: [CardsComponent, CommonModule, GenderPipe, DownloadCatalogueComponent],
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
  public pdfCatalogueVisible = false


constructor(private route: ActivatedRoute, private seoService:SeoService) {}
  

public ngOnInit() {

  this.route.data.subscribe(data => {
    this.categorySelectedData = data['category'];

         const title =`${this.categorySelectedData?.name} · Rótulos Learoy`
         const description = this.categorySelectedData?.description.metaDescription
          const image = this.imagePrefix+this.categorySelectedData?.products[0].images[0];
          const slug = this.categorySelectedData?.slug ?? ''
          this.seoService.updateSeoDynamicTags(title, description??'', image, slug)
          this.pdfCatalogueVisible = this.categorySelectedData?.slug === 'letras-corporeas'
  }); 
  
}
}
