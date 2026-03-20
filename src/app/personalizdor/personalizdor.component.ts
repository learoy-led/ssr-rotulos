import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Preview } from '../models/data.models';
import { PreviewService } from '../services/preview.service';
import { materials } from '../data/personalizador.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalizdor',
  imports: [FormsModule, CommonModule],
  templateUrl: './personalizdor.component.html',
  styleUrl: './personalizdor.component.css'
})
export class PersonalizdorComponent {

   public previewData: Preview = {
      text: '',
      color: '',
      material: 'neon',
      font: '',
      background: ''
    }

public materials = materials
@Input() renderKey!: string;


public previewImage = ''


  constructor(private previewService: PreviewService) {}


    public onSubmit() {
      console.log(this.previewData)
 this.previewService.getPreview(this.previewData).subscribe(res => {
        this.previewImage = res.image;
      });
  }

}      

