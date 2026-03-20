import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PreviewService } from '../services/preview.service';
import { materials } from '../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-personalizdor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent implements OnInit {

  form!: FormGroup;

  text = 'Tu texto aquí';
  color = '#bb33ff';
  font = 'Audiowide';
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


public previewImage = ''


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.form = this.fb.group({
      text: ['Tu texto aquí'],
      color: ['#bb33ff'],
      font: ['Audiowide'],
      background: ['./negro.webp']
    });

    this.applyFormValues(this.form.value);

    this.form.valueChanges
  .pipe(debounceTime(150))
  .subscribe(values => {
    this.applyFormValues(values)
  });
  }

  applyFormValues(values: any) {
    this.text = values.text;
    this.color = values.color;
    this.font = values.font;
    this.background = values.background;
    this.updateText(); // recalcula líneas, tamaños, etc.
  }

  updateText() {
this.lines = this.wrapText(this.text, 12); // simple wrap
    this.lineHeight = this.fontSize * 1.2;

    const totalHeight = this.lines.length * this.lineHeight;

    this.firstDy = -(totalHeight - this.lineHeight) / 2;

    this.innerColor = this.tintColor(this.color, 0.9);
  }

  wrapText(text: string, maxChars: number) {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';

    for (let word of words) {
      const test = current ? current + ' ' + word : word;

      if (test.length <= maxChars) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }

    if (current) lines.push(current);

    return lines;
  }

  tintColor(hex: string, amount = 0.9) {
    const num = parseInt(hex.replace('#', ''), 16);

    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.round(r + (255 - r) * amount);
    g = Math.round(g + (255 - g) * amount);
    b = Math.round(b + (255 - b) * amount);

    return `rgb(${r}, ${g}, ${b})`;
  }


  //onsubmit añadir al carrito genera archivo
}      

