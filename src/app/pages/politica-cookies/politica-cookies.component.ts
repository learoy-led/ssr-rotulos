import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
    selector: 'app-politica-cookies',
      standalone: true,
    imports: [],
    templateUrl: './politica-cookies.component.html',
    styleUrl: './politica-cookies.component.css'
})
export class PoliticaCookiesComponent implements OnInit {
 constructor(private seoService: SeoService) {}

 ngOnInit() {
  this.seoService.noRobots();
}
}
