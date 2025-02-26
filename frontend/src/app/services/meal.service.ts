import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:4000";

  getMeals(restaurant:string){
    const data={
      restaurant:restaurant
    }
    return this.http.post<Meal[]>(`${this.url}/meals/getMeals`, data);
  }
}
