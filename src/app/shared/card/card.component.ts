import { Component, Input } from '@angular/core';
import { Category, Product } from '../../models/data.models';
import { AltPipe } from '../../pipes/alt.pipe';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-card',
  imports: [AltPipe, PricePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() product!: Product

get mainVariant() {
  return this.product?.variants?.[0]
}
 
}
