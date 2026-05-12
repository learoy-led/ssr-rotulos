import { Component, OnInit } from '@angular/core';
import { Category, ContactDetails } from '../../../models/data.models';
import { contactDetails, iconPaths } from '../../../data/data';
import { Observable } from 'rxjs';
import { GetProductsService } from '../../services/get-products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
    selector: 'app-footer',
      standalone: true,
    imports: [CommonModule, RouterModule, IconComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

   public contact: ContactDetails = contactDetails;
   public currentYear = new Date().getFullYear();
  public categories$?: Observable<Category[]>;
  public instagramPath = iconPaths.instagram
  public tiktokPath = iconPaths.tiktok
  public keywords = [
    {
    link: '/catalogo',
    text: 'rótulos publicitarios'
  },
  {
    link: '/letras-corporeas/letras-luminosas-acero-inoxidable',
    text: 'carteles luminosos llamativos'
  },
  {
    link: 'letras-corporeas/letras-corporeas-hierro',
    text: 'rótulos para exterior'
  },
  {
    link: '/letreros-neon/frases-neon',
    text: 'carteles neón'
  },
  ]

  constructor( private getProductsService: GetProductsService ){}

  ngOnInit() {
    this.categories$ = this.getProductsService.getCategories();
  }

}
