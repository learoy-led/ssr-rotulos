import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-error',
  imports: [ButtonComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  constructor(private seoService: SeoService){} 
  
    ngOnInit() {    
   this.seoService.noRobots();
  }

}
