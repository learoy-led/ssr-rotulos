import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../models/data.models';
import { GetProductsService } from '../../core/services/get-products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

   @Input() burguerIsOpen: boolean = false;
  @Output() burguerIsClose =  new EventEmitter<boolean>();
  @Output() showSubmenu = new EventEmitter<boolean>();
  public categories$?: Observable<Category[]>

  constructor( private getProductsService: GetProductsService ){}


  public ngOnInit() {
    this.categories$ = this.getProductsService.getCategories()
}

  public closeBurguer() {
    this.burguerIsOpen = false
    this.burguerIsClose.emit(this.burguerIsOpen);
  }

  public onCatalogoMouseEnter() {
    this.showSubmenu.emit()
  }
  
}
