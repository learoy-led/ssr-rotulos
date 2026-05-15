import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

   public API_URL = environment.API_URL;
   public order = signal<Order | null>(null);
   public orderStatus = computed(() => this.order()?.status);

  constructor(private http: HttpClient) { }

    public getOrderById(orderId: string) {

       this.http.get<Order>(`${this.API_URL}orders/${orderId}`)
    .subscribe(order => this.order.set(order));

    }
  
}
