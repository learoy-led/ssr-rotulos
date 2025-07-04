import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormData } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {


  public API_URL = environment.API_URL || '';
  public submittedMessage: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private http: HttpClient) {}

  public getSubmittedMessage(): Observable<string> {
    return this.submittedMessage.asObservable()
  }

  public sendEmail(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(`${this.API_URL}contact`, formData, httpOptions).subscribe(
      (response) => {
         this.submittedMessage.next('Gracias por tu mensaje. En breve nos pondremos en contacto contigo.')
            },
      (error) => {
           this.submittedMessage.next('Se ha producido un error al enviar tu mensaje. Por favor, inténtalo más tarde.')
      }
    );
  }

  public completeSubmittedMessage() {
    this.submittedMessage.next('');
    this.submittedMessage.complete();
  }

}
