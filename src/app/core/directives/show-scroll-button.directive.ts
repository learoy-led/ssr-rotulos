import { Directive, HostBinding, HostListener } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appShowScrollButton]',
  standalone: true
})
export class ShowScrollButtonDirective {

  constructor(private platformService: PlatformService) { }
  
  @HostBinding('class.visible') isVisible = false;

@HostListener('window:scroll', [])
  onWindowScroll() {

     if (this.platformService.isBrowser()) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isVisible = scrollPosition > 200;
  } 
  }
}
