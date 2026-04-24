import { AfterViewInit, Component, DestroyRef, ElementRef, Input, ViewChild } from '@angular/core';
import { PlatformService } from '../../../../core/services/platform.service';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-image-compare',
   standalone: true,
  imports: [],
  templateUrl: './image-compare.component.html',
  styleUrl: './image-compare.component.css'
})
export class ImageCompareComponent implements AfterViewInit {

    @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

    @Input() images:string[] = []

  public sliderValue = 50; 
  private dragging = false;

  constructor(private platformService: PlatformService,  private destroyRef: DestroyRef) {}

  ngAfterViewInit() {
    if (!this.platformService.isBrowser()) return;
        this.initDrag();
  }

  private initDrag() {

   fromEvent<MouseEvent>(document, 'mousedown')
  .subscribe((e) => {
    if (this.container.nativeElement.contains(e.target as Node)) {
      this.dragging = true;
    }
  });


    fromEvent(document, 'mousemove')
  .subscribe((e) => this.handleMove(e));
    

  fromEvent(document, 'mouseup')
  .subscribe(() => (this.dragging = false));

    

  }

  private handleMove(event: any) {
    if (!this.dragging) return;

    const rect = this.container.nativeElement.getBoundingClientRect();

    const clientX =
      event instanceof TouchEvent
        ? event.touches[0].clientX
        : event.clientX;

    const percent = ((clientX - rect.left) / rect.width) * 100;

    this.sliderValue = Math.max(0, Math.min(100, percent));
  }
  

  
   


}


