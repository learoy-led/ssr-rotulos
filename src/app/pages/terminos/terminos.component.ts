import { Component, OnInit } from '@angular/core';
import { contactDetails } from '../../data/data';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-terminos',
  imports: [],
  templateUrl: './terminos.component.html',
  styleUrl: '../../shared/styles/legal.css'
})
export class TerminosComponent implements OnInit {
public contactDetails = contactDetails

  constructor(private seoService: SeoService) {}  

    
      ngOnInit() {    
     this.seoService.noRobots();
    }

}
