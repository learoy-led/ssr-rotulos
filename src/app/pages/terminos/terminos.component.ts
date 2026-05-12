import { Component } from '@angular/core';
import { contactDetails } from '../../data/data';

@Component({
  selector: 'app-terminos',
  imports: [],
  templateUrl: './terminos.component.html',
  styleUrl: '../../shared/styles/legal.css'
})
export class TerminosComponent {
public contactDetails = contactDetails
}
