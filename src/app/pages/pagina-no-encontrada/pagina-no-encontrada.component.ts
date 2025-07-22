import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ButtonComponent } from '../../shared/button/button.component';


@Component({
    selector: 'app-pagina-no-encontrada',
      standalone: true,
    imports: [ButtonComponent],
    templateUrl: './pagina-no-encontrada.component.html',
    styleUrl: './pagina-no-encontrada.component.css'
})
export class PaginaNoEncontradaComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}
  
   ngOnInit() {
    this.seoService.noRobots();
  }
 }

