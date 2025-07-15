import { Component, OnInit } from '@angular/core';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { SeoService } from '../../core/services/seo.service';


@Component({
    selector: 'app-pagina-no-encontrada',
      standalone: true,
    imports: [NotFoundComponent],
    templateUrl: './pagina-no-encontrada.component.html',
    styleUrl: './pagina-no-encontrada.component.css'
})
export class PaginaNoEncontradaComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}
  
   ngOnInit() {
    this.seoService.noRobots();
  }
 }

