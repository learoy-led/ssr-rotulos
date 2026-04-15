import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materials } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PlatformService } from '../../core/services/platform.service';
import { Material, Product } from '../../models/data.models';
import { CartService } from '../../core/services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule, PricePipe],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit {

  @Input() product!: Product;
  public material?: Material | undefined;


  form!: FormGroup;

  text: string = 'Tu texto aquí';
  color: string = '';
  font: string = '';
  background: string = '/negro.webp';

  variantSize: string = 'S';
  size: number = 10;
  
  width: number = 650;
  height: number = 550;
  fontSize: number = 80

  lines: string[] = [];
  lineHeight = 0;
  firstDy = 0;
  innerColor = '';

  finalPrice = 0



@ViewChild('textEl') textEl!: ElementRef<SVGTextElement>;
@ViewChild('rangeEl') rangeEl!: ElementRef<HTMLInputElement>;

public previewImage = ''

  constructor(private fb: FormBuilder, private platformService: PlatformService,
     private cartService: CartService, private router: Router
   ) {}

 public ngOnInit() {

  this.material  = materials.find((material) => material.name === this.product.renderKey);

      this.form = this.fb.group({
      text: ['Tu texto aquí'],
      color: [this.material?.colors[0] || this.color],
      font: [this.material?.fonts[0] || this.font],
      background: [this.background],
      size: this.size
    });

    this.applyFormValues(this.form.value);

    this.form.valueChanges
  .pipe(debounceTime(150))
  .subscribe(values => {
    this.applyFormValues(values)
  });
  } 

  private applyFormValues(values: any) {
    this.text = values.text;
    this.color = values.color;
    this.font = values.font;
    this.background = values.background;
    this.size = values.size;

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
   setTimeout(() => {
    this.autoFitText();
  }, 0);
  }

  private updateRange() {
if (!this.platformService.isBrowser() || !this.rangeEl) return;
  const value = (Number(this.rangeEl.nativeElement.value) - 10) / (200 - 10) * 100 + "%";
  this.rangeEl.nativeElement.style.setProperty("--value", value);  
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

  }      

