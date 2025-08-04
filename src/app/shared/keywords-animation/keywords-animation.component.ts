import { Component } from '@angular/core';
import { keywords } from '../../data/data';

@Component({
  selector: 'app-keywords-animation',
  imports: [],
  templateUrl: './keywords-animation.component.html',
  styleUrl: './keywords-animation.component.css'
})
export class KeywordsAnimationComponent {
public keywords: string[] = keywords
}
