import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-guest-restaurant-page',
  templateUrl: './guest-restaurant-page.component.html',
  styleUrls: ['./guest-restaurant-page.component.css']
})
export class GuestRestaurantPageComponent {

  allRestaurants:Restaurant[] = [];
  displayedRestaurants:Restaurant[] = [];


  locations:number = 0;
  users:number = 0;

  searchName:string = "";
  searchAddress:string = "";
  searchType:string = "";

  sortParam:string = "";

  constructor(private router: Router, private restaurantService: RestaurantService){}

  ngOnInit(){
    this.getAllRestaurants();
  }



  search(){
    this.displayedRestaurants = this.allRestaurants;

    if(this.searchName != "") {
      this.displayedRestaurants = this.displayedRestaurants.filter(rest => rest.name.includes(this.searchName));
    }
    if(this.searchAddress != ""){
      this.displayedRestaurants = this.displayedRestaurants.filter(rest => rest.address.includes(this.searchAddress));
    }
    if(this.searchType != ""){
      this.displayedRestaurants = this.displayedRestaurants.filter(rest => rest.type.includes(this.searchType));
    }
    if((this.searchName != "") && (this.searchAddress != "") && (this.searchType != "")){
      this.displayedRestaurants = this.allRestaurants;
    }
  }

  sort(direction:string){
    if(this.sortParam == 'name'){
      if(direction == 'up'){
        this.displayedRestaurants.sort((a,b) => {
          if (a.name > b.name) return 1; 
          else if (a.name < b.name)  return -1; 
          else return 0;
        });
      }
      else{
        this.displayedRestaurants.sort((a,b) => {
          if (a.name < b.name) return 1; 
          else if (a.name > b.name)  return -1; 
          else return 0;
        });
      }
    }
    else if(this.sortParam == 'address'){
      if(direction == 'up'){
        this.displayedRestaurants.sort((a,b) => {
          if (a.address > b.address) return 1; 
          else if (a.address < b.address)  return -1; 
          else return 0;
        });
      }
      else{
        this.displayedRestaurants.sort((a,b) => {
          if (a.address < b.address) return 1; 
          else if (a.address > b.address)  return -1; 
          else return 0;
        });
      }
    }
    else if(this.sortParam == 'type'){
      if(direction == 'up'){
        this.displayedRestaurants.sort((a,b) => {
          if (a.type > b.type) return 1; 
          else if (a.type < b.type)  return -1; 
          else return 0;
        });
      }
      else{
        this.displayedRestaurants.sort((a,b) => {
          if (a.type < b.type) return 1; 
          else if (a.type > b.type)  return -1; 
          else return 0;
        });
      }
    }
  }

  getAllRestaurants(){
    this.restaurantService.getAll().subscribe(data=>{
      if(data) {
        this.allRestaurants = data;
        this.displayedRestaurants = data;
        this.locations = this.allRestaurants.length;
      }
      else alert("error");
    })
  }
  sanitizeName(name: string): string {
    return name.replace(/\s+/g, '');
  }

  getRating(name: string) {
    let sum = 0;
    let restaurant = this.allRestaurants.find(r => r.name == name);
    
    if (restaurant) {
        let cnt = 0;
        restaurant.reservations.forEach(r =>{
          sum += r.review.rating;
          if(r.review.rating != 0) cnt++;
        });
        return cnt > 0 ? (sum / cnt) : 0;
    } else {
        return 0;
    }
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

  goToRestaurant(r:Restaurant){
    localStorage.setItem("currentRestaurant",JSON.stringify(r));
    this.router.navigate(["guest-restaurant-details-page"]);
  }
}
