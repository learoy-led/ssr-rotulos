import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

   public API_URL = environment.API_URL;

     constructor(private http: HttpClient) {}

 public pagar() {
  return this.http.post(`${this.API_URL}redsys/create-payment`, {})
}
}
