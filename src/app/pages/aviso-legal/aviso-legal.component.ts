import { Component } from '@angular/core';
import { contactDetails } from '../../data/data';
import { ContactDetails } from '../../models/data.models';

@Component({
    selector: 'app-aviso-legal',
      standalone: true,
    imports: [],
    templateUrl: './aviso-legal.component.html',
    styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent {
public contactDetails: ContactDetails = contactDetails
}
