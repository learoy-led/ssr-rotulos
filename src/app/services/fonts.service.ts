import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  private loadedFonts = new Set<string>();

  async loadFont(name: string, url: string): Promise<void> {
   
    if (this.loadedFonts.has(name)) return;

   try {
  const font = new FontFace(name, `url("/fonts/${url}.woff2")`, {
  display: 'swap'
});

  await font.load();

  (document.fonts as any).add(font);

  this.loadedFonts.add(name);
  console.log('loaded OK:', name);

} catch (err) {
  console.error('FONT FAILED:', name, err);
}  

}

}
