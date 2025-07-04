import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowSubmennu]',
  standalone: true
})
export class ShowSubmennuDirective {

  @Input() catalogoMouseEnter: boolean = false

  @HostBinding('class.visible') submenuVisible = this.catalogoMouseEnter;
  

  @HostListener('mouseleave')
  public onMouseExit() {
    this.submenuVisible = false;
  }

}
