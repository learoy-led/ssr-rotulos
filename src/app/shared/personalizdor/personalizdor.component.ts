import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { iconPaths } from '../../data/data';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule, PricePipe, IconComponent],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit, AfterViewInit {

  @Input() product!: Product;
  public material?: Material | undefined;
  
 public xmarkPath:string = iconPaths.xmark

  form!: FormGroup;

  text: string = 'Tu texto aquí';
  
  color: Color = {
    name: '',
    hex: ''
  };
  lightColor: Color = {
    name: '',
    hex: ''
  };
  baseColor: Color = {
    name: '',
    hex: ''
  };

  font: Font = {
    name: '',
    url: '',
    minHeight: 10,
    opentypeUrl: ''
  };
  background: string = 'default';

  lightColorSelected: boolean = false;
  base: boolean = false;

  variantSize: number = 0;
  size: number = this.font.minHeight;
  proportionalWidth: number  = 0

  width: number = 650;
  height: number = 550;
  fontSize: number = 80

  lines: string[] = [];
  lineHeight = 0;
  firstDy = 0;
  innerColor = '';

  finalPrice = 0


public overlay = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

public scaleX:number = 0;
public scaleY:number = 0;
public offsetY: number = 0;

public visibleFontsCount = 5;

get visibleFonts() {
   return this.material?.fonts?.slice(0, this.visibleFontsCount);
  }

toggleFonts() {
  if (!this.material?.fonts) return
   if (this.visibleFontsCount < this.material?.fonts?.length) {
    this.visibleFontsCount = this.material?.fonts?.length;
  } else {
    this.visibleFontsCount = 5;
  }
}


  get glowColor(): string {
    return this.product.renderKey === 'neon' ? this.color.hex : this.lightColor.hex;
}

public activeModal : 'lightColor' | 'base' | null = null

@ViewChild('textGroup') textGroup!: ElementRef<SVGElement>;
@ViewChild('svgEl') svgEl!: ElementRef<SVGSVGElement>;
@ViewChild('rangeEl') rangeEl!: ElementRef<HTMLInputElement>;

private layoutReady: boolean = false
private fontRef: any;
private fontLoaded = false;
public textPaths: {
  d: string;
  x: number;
  y: number;
}[] = [];


  constructor(private fb: FormBuilder, private platformService: PlatformService,
     private cartService: CartService, private router: Router,
     private fontsService: FontsService,
   ) {}

 public ngOnInit() {

  this.material  = materials.find((material) => material.name === this.product.renderKey);
  this.preloadTopFonts();

      this.form = this.fb.group({
      text: ['',  [
    Validators.required,
    Validators.pattern(/^(?!Tu texto aquí$).+/)
  ]], 
      color: [ this.material?.colors.filter(color => color.uses?.includes('letra'))[0] || this.color, Validators.required],
      lightColor: [ this.material?.colors.filter(color => color.uses?.includes('vinilo') || color.uses?.includes('metacrilato'))[0] || this.lightColor],
      baseColor: [ this.material?.colors.filter(color => color.uses?.includes('base'))[0] || this.baseColor],
      font: [this.material?.fonts[0] || this.font, Validators.required],
      size: this.size,
    });


    this.applyFormValues(this.form.value);

    this.form.valueChanges
  .pipe(debounceTime(150))
  .subscribe(values => {
    this.applyFormValues(values)
  });
console.log(this.background, this.color, this.lightColor)
} 

async loadFont(): Promise<void>  {
   
     if (!this.font?.opentypeUrl || !this.platformService.isBrowser()) {
    console.warn('No se puede cargar fuente', {
      opentypeUrl: this.font?.opentypeUrl,
      isBrowser: this.platformService.isBrowser()
    });
    return;
  }   
   const font = await this.fontsService.loadOpenTypeFont(
  this.font.opentypeUrl
);
this.fontRef = font
this.fontLoaded = true;
this.updateText();
}

 async preloadTopFonts() {
    if (!this.material || !this.platformService.isBrowser()) return    
     const topFonts = this.material.fonts.slice(0, 4);
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
     const area = (this.size * this.lines.length * this.proportionalWidth)/10000

   let variantSelected = this.product.variants.find(v => v.size >= area);
        
   if (!variantSelected) {
  variantSelected = this.product.variants[this.product.variants.length - 1];
} 

   
 area * variantSelected.price < 8000 ? this.finalPrice = 8000 :  this.finalPrice =  area * variantSelected.price;
      this.finalPrice =  Math.round(this.finalPrice * 100) / 100;
   }
  }

  private updateText() {
      this.innerColor = this.tintColor(this.color.hex, 0.9);
    this.lines = this.text.split('\n');
 
 if (!this.fontLoaded || !this.fontRef) {
    this.layoutReady = false;
    return;
  }

  this.layoutReady = true;

  this.fitTextWithMetrics();
  this.recalcLayout();
this.buildTextPaths();

   requestAnimationFrame(() => {
    this.updateOverlay();
    this.updatePrice();
  });
  }

  private measureLine(line: string, size: number): number {
  if (!this.fontLoaded || !this.fontRef) return line.length * size * 0.6;

  return this.fontRef.getAdvanceWidth(line, size);
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

private fitTextWithMetrics() {
 if (!this.fontLoaded) return;

  const maxWidth = this.width * 0.9;
  const maxHeight = this.height * 0.85;

  let size = 80;

  while (size > 16) {
    const widths = this.lines.map(l => this.measureLine(l, size));

    const blockWidth = Math.max(...widths);
    const blockHeight = this.lines.length * size * 1.2;

    if (blockWidth <= maxWidth && blockHeight <= maxHeight) {
      break;
    }

    size -= 2;
  }

  this.fontSize = size;
}

 private recalcLayout() {
  if (!this.platformService.isBrowser()) return;
  const lineH = this.fontSize * 1.2;
 this.lineHeight = lineH;
   const totalHeight = (this.lines.length - 1) * lineH;
   this.offsetY = this.height / 2 - totalHeight / 2;
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


   public onSubmit() { 
     if (this.form.invalid || !this.product.variants) return;
   
  
        const variantSelected = this.product.variants.find(v => v.size >= this.variantSize);
  
   
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
      baseColor: this.baseColor.name,
      size: this.size,
      lines: this.lines,
      proportionalWidth: this.proportionalWidth,
      base: this.base,
      svgString: new XMLSerializer().serializeToString(this.svgEl.nativeElement)
    }
  }

  this.form.reset();
  console.log(productPurchased)
  this.cartService.addToCart(productPurchased)
  this.router.navigate(['/cart']);
  
   
    } 


public ngAfterViewInit() {
  if (!this.platformService.isBrowser()) return
   requestAnimationFrame(() => {
    this.updateText();
  });
  
}

public updateOverlay(){
  if (!this.platformService.isBrowser() || !this.textGroup 
 || !this.fontLoaded) return

 const el = this.textGroup.nativeElement;

  const bbox = (el as SVGGElement).getBBox();

  const padding = 4;

this.overlay = {
   left: bbox.x - padding,
    top: bbox.y- padding,
    width: bbox.width + padding* 2,
    height: bbox.height + padding * 2
};
this.proportionalWidth = this.size * (this.overlay.width / this.overlay.height);
}

private buildTextPaths() {
  if (!this.fontLoaded || !this.fontRef) {
    this.textPaths = [];
    return;
  };

  this.textPaths = this.lines.map((line, index) => {
      const cleanLine = line.trim();
         if (!cleanLine) {
        return null;
      }
    const path = this.fontRef.getPath(cleanLine, 0, 0, this.fontSize);
    const d = path.toPathData(2);
   if (!d || !d.trim().startsWith('M')) {
        return null;
      }
    const lineWidth = this.measureLine(cleanLine, this.fontSize);

    return {
      d,
      x: this.width / 2 - lineWidth / 2,
      y: this.offsetY + index * this.lineHeight
    };
  }).filter((p): p is { d: string; x: number; y: number } => p !== null);
}

public selectBackground(image: string){
this.background = image
}



public openModal(type: 'lightColor' | 'base' | null) {
  this.activeModal = type
  if(type === 'lightColor') {
this.lightColorSelected = true
  }
    if(type === 'base') {
    this.base = true
  }
  }


public closeModal() {
this.activeModal = null;
  }

  public selectColor() {
this.closeModal()
  }

  public unselectColor(activeModal: string) {
    if (activeModal === 'lightColor') {
      this.lightColorSelected = false
      this.lightColor = {
        name: '',
        hex: ''
      }
  }    
    if (activeModal === 'base') {
      this.base = false
        this.baseColor = {
        name: '',
        hex: ''
      }
      }
    this.closeModal()
  }

}      

