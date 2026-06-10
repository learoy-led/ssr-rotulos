import { Injectable } from '@angular/core';
import * as opentype from 'opentype.js';

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  private cssLoadedFonts = new Set<string>();
  private opentypeCache = new Map<string, any>();

  async loadCssFont(name: string, url: string): Promise<void> {
   
  if (this.cssLoadedFonts.has(name)) return;

  try {
  const font = new FontFace(name, `url("/fonts/${url}.woff2")`, {
  display: 'swap'
}
);

  await font.load();

  (document.fonts as any).add(font);

  this.cssLoadedFonts.add(name);

} catch (err) {
  console.error('CSS FONT FAILED:', name, err);
}  

}

 async loadOpenTypeFont(url: string): Promise<any> {
  
    if (this.opentypeCache.has(url)) {
      return this.opentypeCache.get(url);
    }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Font fetch failed: ${url}`);
    }

    const buffer = await res.arrayBuffer();
    const font = opentype.parse(buffer);

    this.opentypeCache.set(url, font);

    return font;

  } catch (err) {
    console.error('OPENTYPE LOAD FAILED:', url, err);
    throw err;
  }
     
  }

}
