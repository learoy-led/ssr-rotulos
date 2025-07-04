import { Component } from '@angular/core';
import { contactDetails } from '../../data/data';
import { ContactDetails } from '../../models/data.models';

@Component({
  selector: 'app-politica-de-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-de-privacidad.component.html',
  styleUrl: './politica-de-privacidad.component.css'
})
export class PoliticaDePrivacidadComponent {
 public contactDetails: ContactDetails = contactDetails
}
