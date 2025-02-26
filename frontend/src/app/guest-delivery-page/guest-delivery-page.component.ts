import { Component } from '@angular/core';
import { User } from '../models/user';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-guest-delivery-page',
  templateUrl: './guest-delivery-page.component.html',
  styleUrls: ['./guest-delivery-page.component.css']
})
export class GuestDeliveryPageComponent {

  me:User = new User;

  allOrders:Order[] = [];

  myOrders:Order[] = [];
  orderArchive:Order[] = [];

  constructor(private orderService:OrderService){}

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.getAll().subscribe(data=>{
      if(data) {
        this.allOrders = data;
        this.allOrders.forEach(o=>{
          if(o.name == this.me.username && (o.status == "accepted" || o.status == "requested")) this.myOrders.push(o);
          if(o.name == this.me.username && (o.status == "delivered"|| o.status == "denied")) this.orderArchive.push(o);
          this.orderArchive.sort((a,b)=>{
            if(a.dateAndTime > b.dateAndTime) return -1;
            else if (a.dateAndTime < b.dateAndTime) return 1;
            else return 0;
          })
        })
      }
      else alert("error");
    })
  }

}
