import { Component } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-waiter-delivery-page',
  templateUrl: './waiter-delivery-page.component.html',
  styleUrls: ['./waiter-delivery-page.component.css']
})
export class WaiterDeliveryPageComponent {

  me:User = new User;
  myRestaurant:Restaurant= new Restaurant;
  orderList:Order[] = [];
  selectedOrder:Order = new Order;

  constructor(private restaurantService:RestaurantService, private orderService:OrderService){}

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getMyRestaurant();
    this.getAllOrders();
  }

  getMyRestaurant(){
    let allRestaurants:Restaurant[] = [];
    this.restaurantService.getAll().subscribe(data=>{
      if(data){
        data.forEach(r=>{
          r.waiters.forEach(w=>{
            if(w.username == this.me.username) this.myRestaurant = r;
          })
        })
      }
      else alert("error");
    })
  }

  getAllOrders(){
    this.orderService.getAll().subscribe(data=>{
      if(data){
        data.forEach(o=>{
          if(o.restaurant == this.myRestaurant.name) this.orderList.push(o);
        })
      }
      else alert("error");
    })
  }
  
  toAccept(order:Order){
    this.selectedOrder = order;
  }

  acceptOrder(s:string){
    this.selectedOrder.status = "accepted";
    this.selectedOrder.expectedDeliveryTime = s;

    this.orderService.acceptOrder(this.selectedOrder).subscribe(data=>{
      if(data == "ok") alert("Porudzbina prihvacena");
      else alert("error");
    })
    
    
  }

  denyOrder(order:Order){
    order.status = "denied";

    this.orderService.denyOrder(order).subscribe(data=>{
      if(data=="ok") alert("Porudzbina odbijena");
      else alert("error");
    })
  }



}
