import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-cards',
  imports: [CommonModule],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.css'
})
export class CategoryCardsComponent {
 @Input() cardElements: (Category)[] | null = [];
 public srcImage: string = ''
public imagePrefix: string = IMAGEPREURL

constructor(private router: Router) {}

public selectElement(category: Category ) {  
      this.router.navigateByUrl(`/${category.slug}`) 
    }

public getSrcImage(category: Category) { 
      if (category.products.length === 0) { return }
      this.srcImage = category.products[0].images[0]
      return this.srcImage
    }
}
