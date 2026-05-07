import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentData, RedsysResponse } from '../../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

   public API_URL = environment.API_URL;

     constructor(private http: HttpClient) {}

 public pagar(data: PaymentData) {
  return this.http.post<RedsysResponse>(`${this.API_URL}redsys/create-payment`, data)
}
}
