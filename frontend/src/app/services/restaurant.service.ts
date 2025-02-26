import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Reservation } from '../models/reservation';
import { Review } from '../models/review';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:4000";

  getAll(){
    return this.http.get<Restaurant[]>(`${this.url}/restaurants/getAll`);
  }

  makeReservation(reservation:Reservation){
    const data={
      reservation:reservation
    }
    return this.http.post<string>(`${this.url}/restaurants/makeReservation`, data);
  }

  cancelReservation(reservation:Reservation){
    const data ={
      reservation:reservation
    }
    return this.http.post<string>(`${this.url}/restaurants/cancelReservation`, data);
  }

  addComment(review:Review, reservation:Reservation){
    const data={
      review:review,
      reservation:reservation
    }
    return this.http.post<string>(`${this.url}/restaurants/addComment`, data);
  }

  acceptReservation(reservation:Reservation){
    return this.http.post<string>(`${this.url}/restaurants/acceptReservation`, reservation);
  }

  denyReservation(reservation:Reservation){
    return this.http.post<string>(`${this.url}/restaurants/denyReservation`, reservation);
  }

  confirmGuests(reservation:Reservation){
    return this.http.post<string>(`${this.url}/restaurants/confirmGuests`, reservation);
  }

  freeTable(reservation:Reservation){
    return this.http.post<string>(`${this.url}/restaurants/freeTable`, reservation);
  }

  extendReservation(reservation:Reservation){
    return this.http.post<string>(`${this.url}/restaurants/extendReservation`, reservation);
  }

  addWaiter(name:string, waiter:User){
    const data={
      name:name,
      waiter:waiter
    }
    return this.http.post<string>(`${this.url}/restaurants/addWaiter`, data);
  }

  addRestaurant(restaurant:Restaurant){
    return this.http.post<Restaurant>(`${this.url}/restaurants/addRestaurant`, restaurant);
  }

  setWorkingHours(hours:string, restaurant:string){
    const data={
      hours:hours,
      restaurant:restaurant
    }
    return this.http.post<string>(`${this.url}/restaurants/setWorkingHours`, data);
  }
}
