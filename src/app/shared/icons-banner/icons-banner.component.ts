import { Component, Input } from '@angular/core';
import { iconPaths } from '../../data/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icons-banner',
  imports: [CommonModule],
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
text: 'Cableado'
  },
    {
path: iconPaths.interruptor,
text: 'Interruptor de encendido y apagado'
  },
      {
path: iconPaths.transformador,
text: 'Transformador'
  },
]

}
