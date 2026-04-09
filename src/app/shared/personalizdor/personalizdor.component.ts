import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materials } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PlatformService } from '../../core/services/platform.service';
import { Material, Variante } from '../../models/data.models';

@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit {

  @Input() renderKey!: string;
  @Input() variantes!: Variante[];
  public material?: Material | undefined;


  form!: FormGroup;

  text: string = 'Tu texto aquí';
  color: string = '';
  font: string = '';
  background: string = '/negro.webp';

  variante: string = 'S';
  size: number = 10;
  
  width: number = 650;
  height: number = 550;
  fontSize: number = 80

  lines: string[] = [];
  lineHeight = 0;
  firstDy = 0;
  innerColor = '';



@ViewChild('textEl') textEl!: ElementRef<SVGTextElement>;
public previewImage = ''

  constructor(private fb: FormBuilder, private platformService: PlatformService ) {}

 public ngOnInit() {

  this.material  = materials.find((material) => material.name === this.renderKey);

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
    this.variante = values.size > 74 ? 'L' : 'S'
    this.updateText(); 
  }

  public getPrice () {
  if (this.text === 'Tu texto aquí') return 0
  const variantSelected = this.variantes.find((vari) => vari.size === this.variante)
  const finalPrice = variantSelected && (variantSelected.price/100) * this.text.length * this.size 
  return finalPrice ? Math.round(finalPrice * 100) / 100 : 0;
  }

  private updateText() {
      this.innerColor = this.tintColor(this.color, 0.9);
    this.lines = this.text.split('\n');

 this.recalcLayout()  
   setTimeout(() => {
    this.autoFitText();
  }, 0);
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

   //onsubmit añadir al carrito genera archivo
}      

