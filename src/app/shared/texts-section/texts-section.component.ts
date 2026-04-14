import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-texts-section',
      standalone: true,
    imports: [IconComponent, CommonModule],
    templateUrl: './texts-section.component.html',
    styleUrl: './texts-section.component.css'
})
export class TextsSectionComponent {

  public lettersPath: string = iconPaths.letters
    public customPath: string = iconPaths.custom
      public shieldPath: string = iconPaths.shield

}
