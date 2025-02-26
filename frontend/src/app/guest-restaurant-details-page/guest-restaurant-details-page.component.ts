import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Restaurant } from '../models/restaurant';
import { Reservation } from '../models/reservation';
import { User } from '../models/user';
import { RestaurantService } from '../services/restaurant.service';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Table } from '../models/table';



@Component({
  selector: 'app-guest-restaurant-details-page',
  templateUrl: './guest-restaurant-details-page.component.html',
  styleUrls: ['./guest-restaurant-details-page.component.css'],
})
export class GuestRestaurantDetailsPageComponent implements AfterViewInit {
  private map: any;
  private canvas:any;
  private ctx:any;

  me:User = new User;

  time:string = "";
  date:string = "";
  extras:string = "";
  numOfPersons:number = 0;

  myRestaurant:Restaurant = new Restaurant;
  myMenu:Meal[]=[];

  myCart:Meal[]=[];
  
  constructor(private restaurantService:RestaurantService,private mealService:MealService
    ,private orderService:OrderService){}

  ngOnInit(){
    let myItem = localStorage.getItem("currentRestaurant");
    if(myItem) this.myRestaurant = JSON.parse(myItem);
    myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getMeals(this.myRestaurant.name);
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.drawCanvas(this.myRestaurant.tables);
  }

  getStars(num:number){
    let index = 0;
    let stars = [];
    let max = 0;
    if(num % 1 != 0) max = ~~(num/1);
    else max = num;
    for (index; index < max; index++) {
      stars[index] = 1;
    }
    if(num % 1 != 0) stars[index+1] = 0; 
    return stars;
  }

  private initMap(): void {
    if(this.myRestaurant.location != ""){
      let s:string  = this.myRestaurant.location;
      let cords:string[] = s.split(',',2);
      let lat = parseFloat(cords[0]);
      let lng = parseFloat(cords[1]);

      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 13
      });

      // Add tile layer to the map
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      });
      
      const customIcon = L.icon({
        iconUrl: 'assets/leaflet/images/marker-icon-2x.png',
        iconSize: [24, 36], // size of the icon
        iconAnchor: [12, 36], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -36] // point from which the popup should open relative to the iconAnchor
      });

      // Add a marker with default icon
      let marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
      marker.bindPopup('<b>Hello world!</b><br>This is a popup.');

      tiles.addTo(this.map);
    }
  }

  reserveTable(){

    if(this.me.active >= 3) alert("Blokirani korisnik - ne mozete podneti zahtev za rezervaciju");
    else if((this.myRestaurant.workingHours.split("-",2)[0] > this.time 
    || this.time > this.myRestaurant.workingHours.split("-",2)[1])
    && this.myRestaurant.workingHours != "") {
      alert("Restoran ne radi za izabrano vreme");
    }
    else{

      let rsv:Reservation = new Reservation;
      rsv.dateAndTime = this.date + '/' + this.time; //format 2024-07-03/01:09
      rsv.extras = this.extras;
      rsv.persons = this.numOfPersons;
      rsv.restaurant = this.myRestaurant.name;
      rsv.name = this.me.username;
      rsv.status = 'requested';

      if(rsv.dateAndTime != '/'){
        this.restaurantService.makeReservation(rsv).subscribe(data=>{
          if(data =='ok') alert("Uspesna rezervacija!");
          else alert("Greska pri rezervisanju");
        })
      }
      else alert("Odaberite datum i vreme rezervacije");
    }
  }

  getMeals(restaurant:string){
    this.mealService.getMeals(this.myRestaurant.name).subscribe(data=>{
      if(data) {
        this.myMenu = data;
      }
      else alert("error");
    })
  }

  addToCart(n:string, meal:Meal){
    let q:number = parseInt(n);
    for (let index = 0; index < q; index++) {
      this.myCart.push(meal);
    }
  }

  getCartTotal(){
    let sum:number = 0;
    this.myCart.forEach(m=>{
      sum += m.price;
    })
    return sum;
  }

  removeFromCart(meal:Meal){
    let index = this.myCart.indexOf(meal,0);
    this.myCart.splice(index,1);
  }

  placeOrder(){
    let myOrder:Order = new Order;
    myOrder.meals = this.myCart;
    myOrder.bill = this.getCartTotal();
    myOrder.restaurant = this.myRestaurant.name;
    myOrder.name = this.me.username;
    myOrder.dateAndTime = this.getTodaysDate();
    myOrder.expectedDeliveryTime = "0:45";
    myOrder.status = "requested";
    
    this.orderService.placeOrder(myOrder).subscribe(data=>{
      if(data == 'ok') alert("Porudzbina uspesna!");
      else alert("error");
    })

  }

  getTodaysDate(){
    //format 2024-07-03/01:09
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var mi = String(today.getMinutes()).padStart(2, '0');
    var hr = String(today.getHours()).padStart(2, '0');

    let date = yyyy + '-' + mm + '-' + dd + '/' + hr + ':' + mi;

    return date;
  }

  drawCanvas(tables:Table[]) {
    // const canvas = document.getElementById("myCanvas") as HTMLCanvasElement; // Explicitly cast to HTMLCanvasElement
    // const this.ctx = canvas.getContext("2d");

    if(this.ctx){
      tables.forEach(t=>{
        if(t.type == "table"){
          let cords:string[] = t.position.split(",",2);
          this.ctx.beginPath();
          this.ctx.arc(parseInt(cords[0]), parseInt(cords[1]),parseInt(t.size) , 0, 2 * Math.PI);
          this.ctx.fillStyle = "white";
          this.ctx.fill();
          this.ctx.stroke();

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText(t.capacity.toString(),textCords[0],textCords[1]);
        }
        else if(t.type == "kitchen"){
          let cords:string[] = t.position.split(",",2);
          let size:string[] = t.size.split(",",2);

          this.ctx.fillStyle = "rgb(255, 204, 0)";
          this.ctx.fillRect(parseInt(cords[0]), parseInt(cords[1]),parseInt(size[0]), parseInt(size[1]));

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText("Kuhinja",textCords[0],textCords[1]);
        }
        else if (t.type == "toilet"){
          let cords:string[] = t.position.split(",",2);
          let size:string[] = t.size.split(",",2);

          this.ctx.fillStyle = "rgb(153, 204, 255)";
          this.ctx.fillRect(parseInt(cords[0]), parseInt(cords[1]),parseInt(size[0]), parseInt(size[1]));

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText("Toalet",textCords[0],textCords[1]);
        }
      })

      
    }
    
   }

  getTextCords(type:string, c:string, s:string){
    let cords:string[] = c.split(",",2);
    if(type == "table") return [parseInt(cords[0])-8,parseInt(cords[1])+10];
    else{
      let size:string[] = s.split(",",2);
      let center:number[] = [(2*parseInt(cords[0])+parseInt(size[0]))/2-30,(2*parseInt(cords[1])+parseInt(size[1]))/2+10];
      return center;
    }
  }

  checkInputs() {
    if (this.date && this.time) {
      this.onDateTimeSelected();
    }
  }

  onDateTimeSelected() {
    let checkDate:string = this.date + '/' +this.time;
    
    let occupied:Table[] = [];
    this.myRestaurant.tables.forEach(t=>{
      let free:Boolean = false;
      this.myRestaurant.reservations.forEach(r=>{
        if(this.hourRange(r.dateAndTime,checkDate,r.time,180) &&
          r.status == "accepted" && r.tableId == t.id && t.id != 0) free = true;
      })
      if(free) occupied.push(t);
    })
    this.drawCanvas(this.myRestaurant.tables);
    this.redrawCanvas(occupied);
  }

  hourRange(time1:string, time2:string, t1:number, t2:number){
    if(time1 == "" || time2 == "") return false;
    //format 2024-07-03/01:09
    let lower:Date = new Date;
    let upper:Date = new Date;

    let date:string[] = time1.split('/',2)[0].split('-',3);
    let time:string[] = time1.split('/',2)[1].split(':',2);

    lower.setFullYear(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
    upper.setFullYear(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));

    lower.setHours(parseInt(time[0]));
    upper.setHours(parseInt(time[0]));

    lower.setMinutes(parseInt(time[1]) - t1);
    upper.setMinutes(parseInt(time[1]) + t2);

    let myDate:Date = new Date;

    let dateD:string[] = time2.split('/',2)[0].split('-',3);
    let timeT:string[] = time2.split('/',2)[1].split(':',2);

    myDate.setFullYear(parseInt(dateD[0]), parseInt(dateD[1]), parseInt(dateD[2]));
    myDate.setHours(parseInt(timeT[0]));
    myDate.setMinutes(parseInt(timeT[1]));


    // console.log(lower);
    // console.log(myDate);
    // console.log(upper);

    if(lower >= myDate || myDate >= upper) return false;
    else return true;
  }

  redrawCanvas(tables:Table[]){
    if(this.ctx){
      tables.forEach(t=>{
        if(t.type == "table"){
          let cords:string[] = t.position.split(",",2);
          this.ctx.beginPath();
          this.ctx.arc(parseInt(cords[0]), parseInt(cords[1]),parseInt(t.size) , 0, 2 * Math.PI);
          this.ctx.fillStyle = "red";
          this.ctx.fill();
          // this.ctx.stroke();

          // let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          // this.ctx.fillStyle = "black";
          // this.ctx.font = "20px Arial";
          // this.ctx.fillText(t.capacity.toString(),textCords[0],textCords[1]);
        }
        })
    }
  }

  getReviews(res:Reservation[]){
    let list:Reservation[] = [];
    res.forEach(r=>{
      if(r.review.text != "" && r.review.author != "" && r.review.rating != 0){
        list.push(r);
      }
    })
    return list; 
  }

}
