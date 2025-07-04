import { Component } from '@angular/core';
import { aboutParagraphs } from '../../data/data';
import { AboutParagraph } from '../../models/data.models';
import { ContactBannerComponent } from '../../shared/contact-banner/contact-banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, ContactBannerComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
public paragraphs: AboutParagraph[] = aboutParagraphs
}
