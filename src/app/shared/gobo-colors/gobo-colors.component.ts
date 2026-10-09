import { Component } from '@angular/core';
import { goboColors } from '../../data/personalizador.data';
import { CommonModule } from '@angular/common';
import { iconPaths } from '../../data/data';

@Component({
  selector: 'app-gobo-colors',
  imports: [CommonModule],
  templateUrl: './gobo-colors.component.html',
  styleUrl: './gobo-colors.component.css'
})
export class GoboColorsComponent {
  public goboColors: string[] = goboColors
  public goboColorsVisible:boolean = false
  public plusPath:string = iconPaths.plus
  public minusPath:string = iconPaths.minus
  public buttonContent:string = iconPaths.plus

  public toggleGoboColors() {
    this.goboColorsVisible = !this.goboColorsVisible
    this.goboColorsVisible ? this.buttonContent = this.minusPath : this.buttonContent = this.plusPath
  }
}
