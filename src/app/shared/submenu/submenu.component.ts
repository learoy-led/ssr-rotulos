import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../models/data.models';
import { IMAGEPREURL } from '../../data/data';
import { GetProductsService } from '../../core/services/get-products.service';

@Component({
    selector: 'app-submenu',
      standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './submenu.component.html',
    styleUrl: './submenu.component.css'
})
export class SubmenuComponent implements OnInit {

   public categories$?: Observable<Category[]>
  public imagePrefix: string = IMAGEPREURL
  @Input() submenuVisible: boolean = false

  constructor( private getProductsService: GetProductsService ){}

ngOnInit() {
  this.categories$ = this.getProductsService.getCategories()
}

}
