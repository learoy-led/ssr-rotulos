import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Preview } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  public API_URL = environment.API_URL || '';
  
  constructor(private http: HttpClient) { }

  public getPreview(previewData: Preview) {
  return this.http.post<{ image: string }>(`${this.API_URL}/preview`, previewData)
 }         

}  

