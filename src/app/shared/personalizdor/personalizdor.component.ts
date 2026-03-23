import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materials } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PlatformService } from '../../core/services/platform.service';

@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit {

  form!: FormGroup;

  text = 'Tu texto aquí';
  color = '#ffd500';
  font = 'Yellowtail';
  background = './negro.webp';

  width: number = 650;
  height: number = 550;
  fontSize: number = 80

  lines: string[] = [];
  lineHeight = 0;
  firstDy = 0;
  innerColor = '';


public materials = materials
@Input() renderKey!: string;
@ViewChild('textEl') textEl!: ElementRef<SVGTextElement>;
public previewImage = ''

  constructor(private fb: FormBuilder, private platformService: PlatformService ) {}

 public ngOnInit() {
      this.form = this.fb.group({
      text: ['Tu texto aquí'],
      color: ['#ffd500'],
      font: ['Yellowtail'],
      background: ['./negro.webp']
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
    this.updateText(); 
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
  
    while (size > 10) {
    this.fontSize = size;
     this.recalcLayout()

  await new Promise(requestAnimationFrame);
    const box = el.getBBox();

    console.log('size', size, box);

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

