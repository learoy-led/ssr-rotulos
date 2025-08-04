import { Directive, HostBinding, HostListener, inject, Input } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appShowSubmennu]',
  standalone: true
})
export class ShowSubmennuDirective {
 private platformService = inject(PlatformService);
  @Input() catalogoMouseEnter: boolean = false

  @HostBinding('class.visible') submenuVisible = this.catalogoMouseEnter;
  

  @HostListener('mouseleave')
  public onMouseExit() {
     if (this.platformService.isBrowser()) {
      this.submenuVisible = false;
    }
  }
}
