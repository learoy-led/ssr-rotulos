import { Component } from '@angular/core';
import { cases } from '../../data/data';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-casos',
      standalone: true,
    imports: [CommonModule],
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
