import { Component, OnInit } from '@angular/core';
import { contactDetails } from '../../data/data';
import { ContactDetails } from '../../models/data.models';
import { SeoService } from '../../core/services/seo.service';

@Component({
    selector: 'app-politica-de-privacidad',
      standalone: true,
    imports: [],
    templateUrl: './politica-de-privacidad.component.html',
    styleUrl: './politica-de-privacidad.component.css'
})
export class PoliticaDePrivacidadComponent implements OnInit {
 public contactDetails: ContactDetails = contactDetails
 
 constructor(private seoService: SeoService) {}

 ngOnInit() {
  this.seoService.noRobots();
}
}
