import { Component, OnInit } from '@angular/core';
import { AboutParagraph } from '../../models/data.models';
import { AltPipe } from '../../pipes/alt.pipe';
import { SocialMediaComponent } from '../../core/components/social-media/social-media.component';
import { SeoService } from '../../core/services/seo.service';
import { AboutService } from '../../services/about.service';

@Component({
    selector: 'app-nosotros',
      standalone: true,
    imports: [AltPipe, SocialMediaComponent],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit {

  public paragraphs: AboutParagraph[] = [];

constructor(private aboutService: AboutService) {}

  ngOnInit() {
this.aboutService.getParagraphs().subscribe(data => {
  this.paragraphs = data;
});  
}

}
