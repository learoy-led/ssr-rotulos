import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icons-banner',
  imports: [IconComponent, CommonModule],
  templateUrl: './icons-banner.component.html',
  styleUrl: './icons-banner.component.css'
})
export class IconsBannerComponent {

@Input() title: string = '';
@Input() subtitle?: string;
@Input() description: string = '';

public iconPaths: Object = iconPaths

public icons = [
  {
path: iconPaths.plugin,
text: 'Transformador'
  },
    {
path: iconPaths.interruptor,
text: 'Cableado'
  },
      {
path: iconPaths.transformador,
text: 'Interruptor de encendido y apagado'
  },
]

}
