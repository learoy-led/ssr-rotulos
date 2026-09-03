import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { materials } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PlatformService } from '../../core/services/platform.service';
import { Color, Font, Material, Product } from '../../models/data.models';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';
import { Router } from '@angular/router';
import { FontsService } from '../../services/fonts.service';
import { ColorModalComponent } from '../color-modal/color-modal.component';


@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule, PricePipe, ColorModalComponent],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() product!: Product;
  public material?: Material | undefined;

  form!: FormGroup;

  width: number = 650;
  height: number = 550;
  fontSize: number = 80

  background: string = 'default';

  text: string = 'Tu texto aquí';
  font: Font = {
    name: '',
    url: '',
    minHeight: 10,
    opentypeUrl: ''
  };
private fontRef: any;
private fontLoaded = false;
public visibleFontsCount = 5;
  
  color: Color = {
    name: '',
    hex: ''
  };
  lightColor: Color = {
    name: '',
    hex: ''
  };
  baseColor: Color | null = {
    name: '',
    hex: ''
  };

previousColor!: Color;
previousLightColor!: Color;
previousBaseColor?: Color | null;

  innerColor = '';
  colorSelected: boolean = false;
  lightColorSelected: boolean = false;


  size: number = this.font.minHeight;
  proportionalWidth: number  = 0;
  variantSize: number = 0;

  finalPrice = 0

  lines: string[] = [];

public textPaths: {
  d: string;
  x: number;
  y: number;
}[] = [];

public maxLineHeight:number = 0
  
public overlay = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

//private referenceHeight: number = 0

public offsetY: number = 0;

public activeModal : 'color' | 'lightColor' | 'base' | null = null
//base: boolean = false;

get visibleFonts() {
   return this.material?.fonts?.slice(0, this.visibleFontsCount);
  }


get glowColor(): string {
    return this.product.renderKey === 'neon' ? this.color.hex : this.lightColor.hex || '#ffffff';
}


@ViewChild('textGroup') textGroup!: ElementRef<SVGElement>;
@ViewChild('svgEl') svgEl!: ElementRef<SVGSVGElement>;
@ViewChild('rangeEl') rangeEl!: ElementRef<HTMLInputElement>;



  constructor(private fb: FormBuilder, private platformService: PlatformService,
     private cartService: CartService, private router: Router,
     private fontsService: FontsService,
   ) {}

 public ngOnInit() {


 this.findMaterial();
 this.preloadFonts();

      this.form = this.fb.group({
      text: ['',  [
    Validators.required,
    Validators.pattern(/^(?!Tu texto aquí$).+/)
  ]], 
      color: [ this.material?.colors.filter(color => color.uses?.includes('letra'))[0] || this.color, Validators.required],
      lightColor: [ this.material?.colors.filter(color => color.uses?.includes('luz'))[0] || this.lightColor],
      baseColor: [ this.material?.colors.filter(color => color.uses?.includes('base'))[0] || this.baseColor],
      font: [this.material?.fonts[0] || this.font, Validators.required],
      size: this.size,
      baseHeight: [this.size + 3, [Validators.min(13), Validators.max(300)]],
      baseWidth: [Math.round(this.proportionalWidth + 3), [Validators.min(this.proportionalWidth + 3)]]
    });


    this.applyFormValues(this.form.value);

  ['text', 'color', 'lightColor', 'font', 'size', 'baseColor'].forEach(controlName => {
  this.form.get(controlName)?.valueChanges
    .pipe(debounceTime(150))
    .subscribe(() => {
      this.applyFormValues(this.form.value);
    });
});

} 

private findMaterial() {
this.material  = materials.find((material) => material.name === this.product.renderKey);
}
private async preloadFonts() {
    if (!this.material || !this.platformService.isBrowser()) return    
       await Promise.allSettled(
  this.material.fonts.map(font => this.fontsService.loadCssFont(font.name, font.url))
);
}
private async applyFormValues(values: any): Promise<void> {
    this.text = values.text || 'Tu texto aquí';
    this.color = values.color;
     this.lightColor = values.lightColor;
     this.baseColor = values.baseColor;

    const fontChanged = this.font?.name !== values.font?.name;
    this.font = values.font;

    this.size = values.size < values.font.minHeight ? values.font.minHeight : values.size;
     
     if (fontChanged || !this.fontLoaded) {
   await this.loadFont(); 
  }

    this.updateText(); 
    this.updateRange();
    

  }

 private async loadFont(): Promise<void>  {
   
     if (!this.font?.opentypeUrl || !this.platformService.isBrowser()) return;
     
   const font = await this.fontsService.loadOpenTypeFont(
  this.font.opentypeUrl
);
this.fontRef = font
this.fontLoaded = true;
this.updateText();
}

 private updateText() {
    this.innerColor = this.tintColor(this.color.hex, 0.9);
    this.lines = this.text.split('\n');
 
 if (!this.fontLoaded || !this.fontRef) return;

 const layout = this.fitTextWithMetrics();
   this.buildLayout(layout);
  
   requestAnimationFrame(() => {
   this.updateOverlay();
    this.updatePrice();
  });
  }

 private  tintColor(hex: string, amount = 0.9) {

    const num = parseInt(hex.replace('#', ''), 16);

    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.round(r + (255 - r) * amount);
    g = Math.round(g + (255 - g) * amount);
    b = Math.round(b + (255 - b) * amount);

    return `rgb(${r}, ${g}, ${b})`;
  }

private measureLayout(fontSize: number) {

  const linesData: {
    d: string;
    width: number;
    height: number;
    top: number;
    bottom: number;
  }[] = [];

  let maxWidth = 0;
  let maxHeight = 0;

  for (const line of this.lines) {

    const clean = line.trim();

    if (!clean) continue;

    const path = this.fontRef.getPath(clean, 0, 0, fontSize);

    const d = path.toPathData(2);

    if (!d || !d.startsWith('M')) continue;

    const box = path.getBoundingBox();

    const width = box.x2 - box.x1;
    const height = box.y2 - box.y1;

    maxWidth = Math.max(maxWidth, width);
    maxHeight = Math.max(maxHeight, height);

    linesData.push({
      d,
      width,
      height,
       top: box.y1,
      bottom: box.y2
    });
  }

  return {
    maxWidth,
    maxHeight,
    linesData
  };
}

private getTotalHeight(
   linesData: {
    top: number;
    bottom: number;
  }[],
  gap: number
): number {

  if (!linesData.length) return 0;

  let currentY = 0;

  for (const line of linesData) {

    const y = currentY - line.top;

    currentY = y + line.bottom + gap;

  }

  return currentY - gap;
}


  private fitTextWithMetrics() {
    const maxWidth = this.width * 0.9;
  const maxHeight = this.height * 0.85;

  let size = 80;

  let layout = this.measureLayout(size);

  while (size > 16) {

    const gap = size * 0.2;

    const totalHeight = this.getTotalHeight(
      layout.linesData,
      gap
    );

    if (
      layout.maxWidth <= maxWidth &&
      totalHeight <= maxHeight
    ) {
      break;
    }

    size -= 2;

    layout = this.measureLayout(size);

  }

  this.fontSize = size;

  return layout;

}

   
 private buildLayout(layout: ReturnType<typeof this.measureLayout>) {
   if (!layout.linesData.length) {
    this.textPaths = [];
    return;
  }

  //this.referenceHeight = layout.maxHeight

   const gap = this.fontSize * 0.2;

     let currentY = 0;

  const positioned = layout.linesData.map(line => {

    const y = currentY - line.top;

    currentY = y + line.bottom + gap;

    return {
      ...line,
      y
    };

  });

  // Altura total del bloque
  const totalHeight = currentY - gap;


  // Desplazamiento para centrar verticalmente
  this.offsetY =
    this.height / 2 - totalHeight / 2;

  this.textPaths = positioned.map(line => ({

    d: line.d,

    x: this.width / 2 - line.width / 2,

    y: line.y + this.offsetY

  }));

}

private updateOverlay(){
  if (!this.platformService.isBrowser() || !this.textGroup 
 || !this.fontLoaded) return

 const el = this.textGroup.nativeElement;

  const bbox = (el as SVGGElement).getBBox();

  const padding = 4;

this.overlay = {
   left: bbox.x - padding,
    top: bbox.y - padding,
    width: bbox.width + padding* 2,
    height: bbox.height + padding * 2
};


//this.proportionalWidth = this.size * (bbox.width / this.referenceHeight );
const totalHeight =
  this.lines.length * this.size +
  (this.lines.length - 1) * (this.size * 0.2);

this.proportionalWidth =
  totalHeight * (bbox.width / bbox.height);


}



  public updatePrice() {
     if (!this.product?.variants || this.text === 'Tu texto aquí') {
    this.finalPrice = 0;
    return;
  } 
   if(this.product.renderKey !== 'neon') {
     let variantSelected = this.product.variants.find(v => v.size >= this.size);
   if (!variantSelected) {
  variantSelected = this.product.variants[this.product.variants.length - 1];
} 
this.finalPrice = variantSelected.price * this.text.replace(/\s/g, '').length * this.size 
  this.finalPrice =  Math.round(this.finalPrice * 100) / 100;
   } else {
    if (!this.overlay) {
      this.finalPrice = 0;
      return;
    }

    const totalHeight = this.lines.length * this.size + (this.lines.length - 1) * (this.size * 0.2)
     const area = ( totalHeight * this.proportionalWidth)/10000
    

   let variantSelected = this.product.variants.find(v => v.size >= area);
  
        
   if (!variantSelected) {
  variantSelected = this.product.variants[this.product.variants.length - 1];
} 


 area * variantSelected.price < 8000 ? this.finalPrice = 8000 :  this.finalPrice =  area * variantSelected.price;
      this.finalPrice =  Math.round(this.finalPrice * 100) / 100;
   }



  }
  
private updateRange() {
if (!this.platformService.isBrowser() || !this.rangeEl || !this.material) return
const maxHeight = this.material.maxHeight || 200;
const currentSize = this.size < this.font.minHeight ? this.font.minHeight : this.size
  const value = (currentSize - this.font.minHeight) / (maxHeight - this.font.minHeight) * 100 + "%";
  
 

requestAnimationFrame(() => {
 const el = this.rangeEl.nativeElement;
 el.value = String(currentSize);
el.style.setProperty("--value", value);  
});

}


public selectBackground(image: string){
this.background = image
}

public openModal(type: 'color' | 'lightColor' | 'base' | null) {
   this.activeModal = type

      switch (type) {
case 'color':
this.previousColor  = { ...this.form.value.color }
break;

case 'lightColor':
this.previousLightColor = {...this.form.value.lightColor  }
break;

case 'base':
   this.previousBaseColor = this.form.value.baseColor
    ? { ...this.form.value.baseColor }
    : null;

      break;
    }

  if(type === 'color') {
this.colorSelected = true
  }

  if(type === 'lightColor') {
this.lightColorSelected = true
  }
    if(type === 'base') {
    //this.base = true;
    const minBaseWidth = Math.round(this.proportionalWidth + 3);
  const currentBaseWidth = this.form.get('baseWidth')?.value;

   if (!currentBaseWidth || currentBaseWidth < minBaseWidth) {
    this.form.patchValue({
      baseWidth: minBaseWidth
    }, { emitEvent: false });
  }
  
  }
}


  public cancelModal() {
    
        switch (this.activeModal) {
    case 'color':
     this.form.patchValue({
    color: this.previousColor
  });
      break;

      case 'lightColor':
         this.form.patchValue({
    lightColor: this.previousLightColor
  });      
      break;

         case 'base':
         this.form.patchValue({
    baseColor: this.previousBaseColor,
  baseHeight: this.size + 3,
  baseWidth: Math.round(this.proportionalWidth + 3)
  });
      break;
    }

  this.activeModal = null;
  }


public toggleFonts() {
  if (!this.material?.fonts) return
 this.visibleFontsCount === 5 ? this.visibleFontsCount = this.material.fonts.length : this.visibleFontsCount = 5
}

public removeBase() {
  this.form.patchValue({
   baseColor: null
   });
}



public ngAfterViewInit() {
  if (!this.platformService.isBrowser()) return
   requestAnimationFrame(() => {
    this.updateText();
  }); 

}
   
public onSubmit() { 
     if (this.form.invalid || !this.product.variants) return;
     

  const variantSelected = this.product.variants.find(v => v.size >= this.size) || this.product.variants[this.product.variants.length - 1];
     
  if (!this.product?._id || !variantSelected) return;

   const productPurchased = {
     id: this.product._id,
    name: this.product.name,
    image: this.product.images[0],
    price: this.finalPrice,
    qty: 1,
    customDetails: {
      text: this.text,
      font: this.font.name,
      color: this.color.name,
      lightColor: this.lightColor.name,
      baseColor: this.baseColor?.name,
      baseHeight: this.form.value.baseHeight,
      baseWidth: this.form.value.baseWidth,
      size: this.size,
      lines: this.lines,
      proportionalWidth: this.proportionalWidth,
      base: this.baseColor ? true : false,
      
      svgString: new XMLSerializer().serializeToString(this.svgEl.nativeElement)
    }
  }

  this.form.reset();
  this.cartService.addToCart(productPurchased)
  this.router.navigate(['/cart']);
  
   
    } 

  ngOnChanges(changes: SimpleChanges) {
   if (changes['product'] && !changes['product'].firstChange) {
    this.resetPersonalizador();
  }
}

private resetPersonalizador() {
  this.findMaterial();

  if (!this.material || !this.form) return;

  this.background = 'default'
  this.text = 'Tu texto aquí';

  this.fontLoaded = false;
  this.fontRef = null;

this.previousColor = {
    name: '',
    hex: ''
  };

  this.previousLightColor = {
    name: '',
    hex: ''
  };

    this.previousBaseColor = {
    name: '',
    hex: ''
  };
  this.innerColor = '';

  //this.base = false;
  this.activeModal = null;

  this.colorSelected = false;
  this.lightColorSelected = false;
    
  this.lines = [];
  this.textPaths = [];
  this.proportionalWidth = 0;
  this.variantSize = 0;
  this.overlay = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

this.offsetY = 0;

  this.finalPrice = 0;
  
  const defaultFont = this.material.fonts[0] || this.font;
const defaultSize = defaultFont.minHeight || 10;

  this.form.reset({
    text: '',
    color: this.material.colors.find(color => color.uses?.includes('letra')) || this.color,
    lightColor: this.material.colors.find(color => color.uses?.includes('luz')) || this.lightColor,
    baseColor: this.material.colors.find(color => color.uses?.includes('base')) || this.baseColor,
    font:  defaultFont,
    size: defaultSize,
    baseHeight: defaultSize + 3,
    baseWidth: 0
  }, { emitEvent: false });

  this.applyFormValues(this.form.value);
}

}      

