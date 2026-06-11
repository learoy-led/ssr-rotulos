import { Component, Input, OnInit } from '@angular/core';
import {  Product } from '../../models/data.models';
import { AltPipe } from '../../pipes/alt.pipe';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-card',
  imports: [AltPipe, PricePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

@Input() product!: Product

get mainVariant() {
  return this.product?.variants?.[0] 
}

public mainVariantPrice = 0

public ngOnInit() {
if(this.mainVariant) {
this.product.categories.find((cat)=> cat.name === 'Letras corpóreas') ? this.mainVariantPrice = this.mainVariant?.price * 10 :
this.mainVariantPrice = this.mainVariant?.price
}
}

 
}
