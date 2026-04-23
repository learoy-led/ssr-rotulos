import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materials } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PlatformService } from '../../core/services/platform.service';
import { Font, Material, Product } from '../../models/data.models';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';
import { Router } from '@angular/router';
import { FontsService } from '../../services/fonts.service';

@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule, PricePipe],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit, AfterViewInit {

  @Input() product!: Product;
  public material?: Material | undefined;
  

  form!: FormGroup;

  text: string = 'Tu texto aquí';
  color: string = '';
  font: Font = {
    name: '',
    url: '',
    minHeight: 10
  };
  background: string = '/negro.webp';

  variantSize: string = 'S';
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

private fitTimeout: any;
public previewImage = ''

textRect!:DOMRect
svgRect!:DOMRect

overlay = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};


  get glowColor(): string {
  if (this.product.renderKey === 'acero') {
    return '#fff5cc'; // blanco cálido
  }
  if (this.product.renderKey === 'pvc') {
    return '#ffffff'; // blanco frío
  }
  return this.color; 
}

@ViewChild('textEl') textEl!: ElementRef<SVGTextElement>;
@ViewChild('svgEl') svgEl!: ElementRef<SVGSVGElement>;
@ViewChild('rangeEl') rangeEl!: ElementRef<HTMLInputElement>;


  constructor(private fb: FormBuilder, private platformService: PlatformService,
     private cartService: CartService, private router: Router,
     private fontsService: FontsService,
   ) {}

 public ngOnInit() {

  this.material  = materials.find((material) => material.name === this.product.renderKey);
  this.preloadTopFonts();

      this.form = this.fb.group({
      text: ['Tu texto aquí'],
      color: [this.material?.colors[0] || this.color],
      font: [this.material?.fonts[0] || this.font],
      background: [this.background],
      size: this.size,
    });

    this.applyFormValues(this.form.value);

    this.form.valueChanges
  .pipe(debounceTime(150))
  .subscribe(values => {
    this.applyFormValues(values)
  });

} 



  async preloadTopFonts() {
    if (!this.material || !this.platformService.isBrowser()) return    
     //const topFonts = this.material.fonts.slice(0, 3);
       await Promise.allSettled(
  this.material.fonts.map(font => this.fontsService.loadFont(font.name, font.url))
);
}

  private applyFormValues(values: any) {
    this.text = values.text;
    this.color = values.color;
    this.font = values.font;
    this.background = values.background;
    this.size = values.size < values.font.minHeight ? values.font.minHeight : values.size;

  if (this.product.name.includes('3D')) {
this.variantSize = values.size >= 50 ? 'L' : 'S'
  } else {
this.variantSize = values.size >= 75 ? 'L' : 'S'
  }
    
    this.updateText(); 
    this.updateRange()
  }

  public getPrice() {
  if (!this.product?.variants) return 0;
  const variantSelected = this.product.variants.find((v) => v.size === this.variantSize)
   if (!variantSelected || this.text === 'Tu texto aquí') return 0;
  this.finalPrice = variantSelected && (variantSelected.price) * this.text.replace(/\s/g, '').length * this.size 
  this.finalPrice =  Math.round(this.finalPrice * 100) / 100;
  return this.finalPrice
  }

  private updateText() {
      this.innerColor = this.tintColor(this.color, 0.9);
    this.lines = this.text.split('\n');

 this.recalcLayout()  


  clearTimeout(this.fitTimeout);
  
    this.fitTimeout = setTimeout(() => {
    this.autoFitText();
  }, 50); 

  //  setTimeout(() => {
  //   this.autoFitText();
  // }, 0);
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

async autoFitText() {
  if (!this.platformService.isBrowser() || !this.textEl) return;

      const el = this.textEl.nativeElement;

  const maxWidth = this.width * 0.9;
  const maxHeight = this.height * 0.9;

let size = this.fontSize;

   while (size > 18) {
     this.fontSize = size;
     this.recalcLayout();

    await new Promise(requestAnimationFrame);
    
  

    const box = el.getBBox();
    this.proportionalWidth = (this.size * box.width)/box.height
    console.log('caja', this.proportionalWidth)
   if (box.width <= maxWidth && box.height <= maxHeight) {
     break;
   }

 size -= 2;
 }


this.fontSize = size;



  this.recalcLayout()
}

 private recalcLayout() {
 this.lineHeight = this.fontSize * 1.2;
  const totalHeight = (this.lines.length - 1) * this.lineHeight;
  this.firstDy = -totalHeight / 2;


 }

   public onSubmit() { 
     if (this.form.invalid) return;
  const variantSelected = this.product.variants && this.product.variants.find((v) => v.size === this.variantSize);
  if (!this.product?._id || !variantSelected) return;
  const productPurchased = {
     id: this.product._id,
    name: this.product.name,
    image: this.product.images[0],
    price: this.finalPrice,
    qty: 1,
    customDetails: {
      text: this.text,
      font: this.font,
      color: this.color,
      size: this.size
    }
  }
  this.form.reset();
  this.cartService.addToCart(productPurchased)
  console.log(productPurchased)
  this.router.navigate(['/cart']);
  
   //generar archivo para Alex
    } 


   public ngAfterViewInit() {
  this.updateOverlay();
}

public updateOverlay(){
  if (!this.platformService.isBrowser() || !this.textEl || !this.svgEl) return
this.textRect = this.textEl.nativeElement.getBoundingClientRect();
this.svgRect = this.svgEl.nativeElement.getBoundingClientRect();

this.overlay = {
  left: this.textRect.left - this.svgRect.left,
  top: this.textRect.top - this.svgRect.top,
  width: this.textRect.width,
  height: this.textRect.height
};
console.log(this.overlay)
}
  }      

