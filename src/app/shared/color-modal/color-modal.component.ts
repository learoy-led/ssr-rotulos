import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
export class ColorModalComponent implements OnChanges {

public xmarkPath:string = iconPaths.xmark
public Math = Math;

@Input() activeModal!: 'color' | 'lightColor' | 'base' 
@Input() material!: Material
@Input() form!: FormGroup

@Input() lettersHeight!: number;
@Input() lettersWidth!: number;


@Output() closed = new EventEmitter<void>();
@Output() cancel = new EventEmitter<void>();
@Output() removeBaseSelected = new EventEmitter<void>();


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

public removeBase() {
  this.removeBaseSelected.emit();
  this.closed.emit();
}

ngOnChanges() {
 console.log('FORM CAMBIÓ:', this.form.value.baseWidth);
 }

}
