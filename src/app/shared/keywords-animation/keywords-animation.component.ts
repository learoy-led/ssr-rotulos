import { Component } from '@angular/core';
import { keywords } from '../../data/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keywords-animation',
  imports: [CommonModule],
  templateUrl: './keywords-animation.component.html',
  styleUrl: './keywords-animation.component.css'
})
export class KeywordsAnimationComponent {
public keywords: string[] = keywords
}
