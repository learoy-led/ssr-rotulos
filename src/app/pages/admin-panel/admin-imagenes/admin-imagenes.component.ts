import { Component, OnInit } from '@angular/core';
import { iconPaths } from '../../../data/data';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { ImagesService } from '../../../services/images.service';
import { Image } from '../../../models/data.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-imagenes',
  imports: [FormsModule, DragDropModule, CommonModule],
  templateUrl: './admin-imagenes.component.html',
  styleUrl: './admin-imagenes.component.css',
})
export class AdminImagenesComponent implements OnInit {
  public binPath = iconPaths.bin;
  public dragPath = iconPaths.drag;
  public errorMessage: string = '';

  private allowedTypes: string[] = ['image/webp', 'image/jpg', 'image/jpeg'];
  private maxSize: number = 2 * 1024 * 1024; //2MB
  public selectedFiles: File[] = [];
  selectedFilesByLocation: Record<string, File[]> = {};

  public locations?: string[];
  public groupedImages: Record<string, Image[]> =  {};

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.imagesService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
 this.getImagesByLocation()
  }

  public onSubmit(location: string, images: Image[]) {
    if (this.errorMessage) return;

    const formData = new FormData();

    formData.append('location', location);
    formData.append('images', JSON.stringify(images.map((img) => img._id)));

    formData.append(
      'order',
      JSON.stringify(
        images.map((img, index) => ({
          id: img._id,
          order: index,
        })),
      ),
    );

    (this.selectedFilesByLocation[location] || []).forEach((file) => {
      formData.append('image', file);
    });

    this.imagesService.updateImages(formData).subscribe({
      next: () => {
        alert('Imágenes actualizadas.');
       this.getImagesByLocation()
      },
      error: () => {
        alert('Error al subir las imágenes.');
      },
    });
  }

  public onFilesSelected(event: Event, location: string) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.errorMessage = '';
    const files = Array.from(input.files);

    for (const file of files) {
      if (!this.allowedTypes.includes(file.type)) {
        this.errorMessage = 'Formato no permitido.';
        return;
      }

      if (file.size > this.maxSize) {
        this.errorMessage = 'La imagen no puede superar los 2MB.';
        return;
      }
    }

    this.selectedFilesByLocation[location] = files;
  }

  public onDeleteImage(id: string) {
    const deleteConfirmation = confirm(
      '¿Estás seguro de que quieres eliminar la imagen?',
    );
    if (!deleteConfirmation) return;
    console.log('el id es', id);
    this.imagesService.deleteImage(id).subscribe({
      next: () => {
             alert('Imagen eliminada');
              this.getImagesByLocation()
      },
      error: () => {
        alert('Error al eliminar la imagen');
      },
    });
  }

  public drop(event: CdkDragDrop<Image[]>, location: string) {
  moveItemInArray(
    this.groupedImages[location], 
    event.previousIndex, 
    event.currentIndex);
   }

  public cancel(location: string) {
    this.selectedFilesByLocation[location] = [];
    this.errorMessage = '';
    this.getImagesByLocation()
  }

  private getImagesByLocation() {
this.imagesService.getImages().subscribe(images => {
    this.groupedImages = images.reduce((acc, img) => {
      acc[img.location] ??= [];
      acc[img.location].push(img);
      return acc;
    }, {} as Record<string, Image[]>);

    for (const location in this.groupedImages) {
      this.groupedImages[location].sort((a, b) => a.order - b.order);
    }
  });
  }
}
