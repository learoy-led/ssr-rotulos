import { inject, Injectable } from '@angular/core';
import { PlatformService } from '../core/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  
   private platformService = inject(PlatformService);
   private pdfjsLib: any;

  async loadPdfJs() {

  if (!this.platformService.isBrowser() || typeof window === 'undefined') return;
  if (this.pdfjsLib) return;
 
   const pdfjs = await import('pdfjs-dist');

  this.pdfjsLib = pdfjs;

  this.pdfjsLib.GlobalWorkerOptions.workerSrc =  '/pdf.worker.min.mjs';
}
 


 async pdfToImage(
    file: File
  ): Promise<string> {
    
 if (typeof window === 'undefined') return '';
  await this.loadPdfJs();
   
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await this.pdfjsLib.getDocument({
      data: arrayBuffer
    }).promise;

    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 4,  rotation: 0 });

    const canvas = document.createElement('canvas');
   
const context = canvas.getContext('2d')!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;


context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

   const renderTask = page.render({
 canvas: canvas,
  viewport
});
    

await renderTask.promise;

    return canvas.toDataURL('image/png');
  }

}
