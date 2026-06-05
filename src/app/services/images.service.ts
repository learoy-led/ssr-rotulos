import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Image } from '../models/data.models';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  public API_URL = environment.API_URL || '';

 getImages(): Observable<Image[]> {
      return this.http.get<Image[]>(`${this.API_URL}images`);
    }

    getLocations(): Observable<string[]> {
      return this.http.get<Image[]>(`${this.API_URL}images`).pipe(
        map(images => {
          return Array.from(new Set(images.map(img => img.location)))
        }) 
      );
    }


   updateImages(images: FormData): Observable<Image[]> {
    return this.http.put<Image[]>(`${this.API_URL}images`, images)
      }


       deleteImage(id: string) {
  return this.http.delete(`${this.API_URL}images/${id}`, {})
  }
}
