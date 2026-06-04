import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RichTextComponent } from '../../../shared/rich-text/rich-text.component';
import { AboutParagraph } from '../../../models/data.models';
import { SeoService } from '../../../core/services/seo.service';
import { AboutService } from '../../../services/about.service';

@Component({
  selector: 'app-admin-nosotros',
  imports: [FormsModule, CommonModule, RichTextComponent],
  templateUrl: './admin-nosotros.component.html',
  styleUrl: './admin-nosotros.component.css'
})
export class AdminNosotrosComponent {

  constructor(private seoService: SeoService, private aboutService: AboutService) {}

public paragraphs: AboutParagraph[] = [];

   public errorMessage:string = ''
   private allowedTypes:string[] = ['image/webp', 'image/jpg', 'image/jpeg']
  private maxSize:number = 2 * 1024 * 1024 //2MB
   public selectedFile?: File;


      ngOnInit() {
       this.seoService.noRobots();
this.aboutService.getParagraphs().subscribe(data => {
  this.paragraphs = data;
});  
}

   public onSubmit(paragraph: AboutParagraph) {
      if (this.errorMessage) return;
      this.aboutService.updateParagraph(paragraph).subscribe({
    next: (updated) => {
       const index = this.paragraphs.findIndex(p => p._id === updated._id);
        this.paragraphs[index] = updated;
        alert('Párrafo actualizado.')
    },
       error:() => {
        alert('Se ha producido un error al actualizar el párrafo. Por favor, inténtalo más tarde.')
        }
      });
};


onFileSelected(event: Event) {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;
   this.errorMessage = '';

  const file = input.files[0];

   if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Formato no permitido.';
      return;
    }

    if (file.size > this.maxSize) {
      this.errorMessage = 'La imagen no puede superar los 2MB.';
      return;
    }

   this.selectedFile = file;

}

}
