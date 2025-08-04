import { Component } from '@angular/core';
import { aboutParagraphs } from '../../data/data';
import { AboutParagraph } from '../../models/data.models';
import { ContactBannerComponent } from '../../shared/contact-banner/contact-banner.component';
import { KeywordsAnimationComponent } from '../../shared/keywords-animation/keywords-animation.component';
import { AltPipe } from '../../pipes/alt.pipe';

@Component({
    selector: 'app-nosotros',
      standalone: true,
    imports: [ContactBannerComponent, KeywordsAnimationComponent, AltPipe],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
public paragraphs: AboutParagraph[] = aboutParagraphs
}
