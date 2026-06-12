import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { iconPaths } from '../../data/data';
import { CommonModule } from '@angular/common';
import { Material } from '../../models/data.models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-color-modal',
  imports: [IconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './color-modal.component.html',
  styleUrl: './color-modal.component.css'
})
export class ColorModalComponent {

public xmarkPath:string = iconPaths.xmark

@Input() activeModal!: 'color' | 'lightColor' | 'base' 
@Input() material!: Material
@Input() form!: FormGroup

@Input() lettersHeight!: number;
@Input() lettersWidth!: number;


@Output() closed = new EventEmitter<void>();
@Output() cancel = new EventEmitter<void>();

get activeControlName() {
  return this.activeModal === 'base'
    ? 'baseColor'
    : this.activeModal === 'color'
      ? 'color'
      : 'lightColor';
}

public closeModal() {
this.closed.emit();
  }

public unselectColor() {
  this.cancel.emit();
  this.closed.emit();
}


}
