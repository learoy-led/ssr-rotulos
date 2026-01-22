import { Component, Input } from '@angular/core';
import { Category } from '../../models/data.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-cards',
  imports: [],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.css'
})
export class CategoryCardsComponent {
 @Input() cardElements: (Category)[] | null = [];
 public srcImage: string = ''

constructor(private router: Router) {}

public selectElement(category: Category ) {  
      this.router.navigateByUrl(`/${category.slug}`) 
    }

}
