import { Component, OnInit } from '@angular/core';
import { AboutParagraph } from '../../models/data.models';
import { AltPipe } from '../../pipes/alt.pipe';
import { SocialMediaComponent } from '../../core/components/social-media/social-media.component'
import { AboutService } from '../../services/about.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-nosotros',
      standalone: true,
    imports: [AltPipe, SocialMediaComponent, CommonModule],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit {

  public paragraphs$?: Observable <AboutParagraph[]>;

constructor(private aboutService: AboutService) {}

  ngOnInit() {
this.paragraphs$ = this.aboutService.getParagraphs()
}

}
