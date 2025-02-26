import { Component } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { Reservation } from '../models/reservation';
import { RestaurantService } from '../services/restaurant.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-guest-reservations-page',
  templateUrl: './guest-reservations-page.component.html',
  styleUrls: ['./guest-reservations-page.component.css']
})
export class GuestReservationsPageComponent {

  me:User = new User;

  newComment:string = "";
  newRating:number = 0;
  currReservation:Reservation = new Reservation;

  allRestaurants:Restaurant[]=[];

  myReservations:Reservation[]=[];
  reservationArchive:Reservation[]=[];

  constructor(private restaurantService:RestaurantService){}

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getAllRestaurants();
  }

  getAllRestaurants(){
    this.restaurantService.getAll().subscribe(data=>{
      if(data) {
        this.allRestaurants = data;
        this.allRestaurants.forEach(r=>{
          r.reservations.forEach(z=>{
            if(z.name == this.me.username && z.served == false && z.status == "accepted") this.myReservations.push(z);
            if(z.name == this.me.username && z.served == true) this.reservationArchive.push(z);
            if(z.name == this.me.username && z.served == false && z.status == "denied") this.reservationArchive.push(z);
          })
        })
        this.reservationArchive.sort((a,b)=>{
          if(a.dateAndTime > b.dateAndTime) return -1;
          else if (a.dateAndTime < b.dateAndTime) return 1;
          else return 0;
        })
      }
      else alert("error");
    })
  }

  getAddress(s:string){
    let ss:string = "";
    this.allRestaurants.forEach(r=>{
      if(r.name == s) ss = r.address;
    })
    return ss;
  }

  checkReservationDate(){
    //format 2024-07-03/01:09
    let today = new Date();
    today.setMinutes(today.getMinutes() + 45);
     
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     var mi = String(today.getMinutes()).padStart(2, '0');
     var hr = String(today.getHours()).padStart(2, '0');
 
     let date = yyyy + '-' + mm + '-' + dd + '/' + hr + ':' + mi;
 
    return date;
  }

  cancelReservation(r:Reservation){
    this.restaurantService.cancelReservation(r).subscribe(data=>{
      if(data == 'ok') alert("Uspesno ponistena rezervacija");
      else alert("error");
    })
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

  setCurrReservation(r:Reservation){
    this.currReservation = r;
  }

  addComment(){
    let comment:Review = new Review;

    comment.text = this.newComment;
    comment.rating = this.newRating;
    comment.author = this.me.username;

    this.restaurantService.addComment(comment, this.currReservation).subscribe(data=>{
      if(data == 'ok') alert("Komentar dodat");
      else alert("error");
    })
  }

}
