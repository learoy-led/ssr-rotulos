import { Component, OnInit } from '@angular/core';
import { iconPaths } from '../../data/data';
import { AltPipe } from '../../pipes/alt.pipe';
import { KeywordsAnimationComponent } from '../../shared/keywords-animation/keywords-animation.component';
import { Image } from '../../models/data.models';
import { ImagesService } from '../../services/images.service';


@Component({
    selector: 'app-casos',
      standalone: true,
    imports: [AltPipe, KeywordsAnimationComponent],
    templateUrl: './casos.component.html',
    styleUrl: './casos.component.css'
})
export class CasosComponent implements OnInit {

public cases: Image[] = []
public selectedCase: string | null = null
public xmarkPath = iconPaths.xmark


constructor(private imagesService: ImagesService
  ) {}

  ngOnInit() {
this.imagesService.getImages().subscribe(images => {
  this.cases = images.filter(img => img.location === 'Casos');
    })
  }

public selectCase(i:number) {
 this.selectedCase = this.cases[i].url
}

public closeImageZoom () {
  this.selectedCase = null
}
}
