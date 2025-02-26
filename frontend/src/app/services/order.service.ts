import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:4000";

  placeOrder(order:Order){
    const data={
      order:order
    }
    console.log()
    return this.http.post<string>(`${this.url}/orders/placeOrder`, data);
  }

  getAll(){
    return this.http.get<Order[]>(`${this.url}/orders/getAll`);
  }

  acceptOrder(order:Order){
    return this.http.post<string>(`${this.url}/orders/acceptOrder`, order);
  }

  denyOrder(order:Order){
    return this.http.post<string>(`${this.url}/orders/denyOrder`, order);
  }

}
