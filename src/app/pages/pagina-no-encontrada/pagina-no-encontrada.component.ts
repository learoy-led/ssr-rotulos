import { Component, inject, makeStateKey, OnInit, TransferState } from '@angular/core';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { SeoService } from '../../core/services/seo.service';


const STATUS_CODE_KEY = makeStateKey<number>('ssr-status-code');

@Component({
    selector: 'app-pagina-no-encontrada',
      standalone: true,
    imports: [NotFoundComponent],
    templateUrl: './pagina-no-encontrada.component.html',
    styleUrl: './pagina-no-encontrada.component.css'
})
export class PaginaNoEncontradaComponent implements OnInit {
  
  constructor(private seoService: SeoService, private transferState: TransferState) {
    // const state = inject(TransferState);
    // state.set(STATUS_CODE_KEY, 404);

     this.transferState.set(STATUS_CODE_KEY, 404);
  }
  
   ngOnInit() {
    this.seoService.noRobots();
  }
 }

