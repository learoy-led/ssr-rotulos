import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SubmenuComponent } from '../../../shared/submenu/submenu.component';
import { ContactDetails } from '../../../models/data.models';
import { contactDetails } from '../../../data/data';
import { SearchInputComponent } from '../../../shared/search-input/search-input.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule, NavbarComponent, SubmenuComponent, SearchInputComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

   public contactDetails: ContactDetails = contactDetails

  public burguerIsOpen: boolean = false;
  public submenuVisible: boolean = false;
  

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
