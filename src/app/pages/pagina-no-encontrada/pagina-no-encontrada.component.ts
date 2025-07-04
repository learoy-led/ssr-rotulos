import { Component } from '@angular/core';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [NotFoundComponent],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.css'
})
export class PaginaNoEncontradaComponent {

}
