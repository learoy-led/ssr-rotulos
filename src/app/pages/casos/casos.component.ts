import { Component } from '@angular/core';
import { cases } from '../../data/data';
import { AltPipe } from '../../pipes/alt.pipe';
import { KeywordsAnimationComponent } from '../../shared/keywords-animation/keywords-animation.component';

@Component({
    selector: 'app-casos',
      standalone: true,
    imports: [AltPipe, KeywordsAnimationComponent],
    templateUrl: './casos.component.html',
    styleUrl: './casos.component.css'
})
export class CasosComponent {

public cases = cases
public selectedCase: string | null = null


public selectCase(i:number) {
 this.selectedCase = cases[i]
}

public closeImageZoom () {
  this.selectedCase = null
}
}
