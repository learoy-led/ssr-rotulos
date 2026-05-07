import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { ContactDetails } from '../../../models/data.models';
import { contactDetails, iconPaths, keywords } from '../../../data/data';
import { SearchInputComponent } from '../../../shared/search-input/search-input.component';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule, NavbarComponent, SearchInputComponent, IconComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

   public contactDetails: ContactDetails = contactDetails
     public phonePath:string = iconPaths.phone
     public envelopePath:string = iconPaths.envelope
      public cartPath:string = iconPaths.cart
  

  public burguerIsOpen: boolean = false;
  public submenuVisible: boolean = false;

  public keywords: string[] = keywords
  

  public openBurguer() {
    this.burguerIsOpen = !this.burguerIsOpen;
  }

  onBurguerStateChanged(newState: boolean) {
    this.burguerIsOpen = newState;
  }

 public showSubmenu() {
   this.submenuVisible = true;
 }

   public hideSubmenu() {
    this.submenuVisible = false;
   }
}
