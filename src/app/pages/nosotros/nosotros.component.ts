import { Component } from '@angular/core';
import { aboutParagraphs } from '../../data/data';
import { AboutParagraph } from '../../models/data.models';
import { ContactBannerComponent } from '../../shared/contact-banner/contact-banner.component';
import { AltPipe } from '../../pipes/alt.pipe';
import { SocialMediaComponent } from '../../core/components/social-media/social-media.component';

@Component({
    selector: 'app-nosotros',
      standalone: true,
    imports: [ContactBannerComponent, AltPipe, SocialMediaComponent],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
public paragraphs: AboutParagraph[] = aboutParagraphs
}
