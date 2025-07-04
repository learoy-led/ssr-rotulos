import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
@Input() notFoundText = ''
}
