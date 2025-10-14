import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from "../../core/components/contact-form/contact-form.component";
import { SchemaService } from '../../core/services/schema.service';

@Component({
    selector: 'app-contacto',
      standalone: true,
    imports: [ContactFormComponent],
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {

   constructor(private schemaService: SchemaService) {}

   public ngOnInit() {
this.schemaService.insertSchema(this.schemaService.getLocalBusinessSchema(),'schema-localbusiness')
}

}
