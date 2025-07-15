import { Component, OnInit } from '@angular/core';
import { contactDetails } from '../../data/data';
import { ContactDetails } from '../../models/data.models';
import { SeoService } from '../../core/services/seo.service';

@Component({
    selector: 'app-aviso-legal',
      standalone: true,
    imports: [],
    templateUrl: './aviso-legal.component.html',
    styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent implements OnInit {
public contactDetails: ContactDetails = contactDetails
 constructor(private seoService: SeoService) {}

 ngOnInit() {
  this.seoService.noRobots();
}
}
