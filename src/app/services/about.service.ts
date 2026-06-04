import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutParagraph } from '../models/data.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

    public API_URL = environment.API_URL || '';

 getParagraphs(): Observable<AboutParagraph[]> {
    return this.http.get<AboutParagraph[]>(`${this.API_URL}about`);
  }
  
  updateParagraph(paragraph: AboutParagraph): Observable<AboutParagraph> {
    return this.http.put<AboutParagraph>(`${this.API_URL}about/${paragraph._id}`, paragraph);
  }
}
