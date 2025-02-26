import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


  allRestaurants:Restaurant[] = [];
  displayedRestaurants:Restaurant[] = [];

  reservations:Reservation[] = [];

  
  pastMonth:number = 0;
  past7Days:number = 0;
  pastDay:number = 0;


  locations:number = 0;
  usersCounter:number = 0;

  searchName:string = "";
  searchAddress:string = "";
  searchType:string = "";

  sortParam:string = "";

  constructor(private router: Router, private restaurantService: RestaurantService, private userService:UserService){}

  ngOnInit(){
    this.getAllRestaurants();
    this.getAllUsers();
  }

  toLogin(){
    this.router.navigate(['login-page']);
  }

  toRegister(){
    this.router.navigate(['register-page']);
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
        let d = new Date;
        this.allRestaurants.forEach(r=>{
          r.reservations.forEach(rr=>{
            let date:string[] = rr.dateAndTime.split('/',2)[0].split('-',3);
            if(d.getFullYear()  == parseInt(date[0])){
              if((d.getMonth()+1) == parseInt(date[1])){
                this.pastMonth++;
                if(d.getDate() == parseInt(date[2])) {
                  this.pastDay++;
                  this.past7Days++;
                }
                else if(d.getDate() < parseInt(date[2]) && d.getDate() > parseInt(date[2])-7) this.past7Days++;
              }
            }
          })
        })
      }
      else alert("error");
    })
  }

  sanitizeName(name: string): string {
    return name.replace(/\s+/g, '');
  }

  getAllUsers(){
    this.userService.getAll().subscribe(data=>{
      if(data){
        let cnt = 0;
        data.forEach(u=>{
          if(u.type == 'gost') cnt++;
        })
        this.usersCounter = cnt;
      }
    })
  }


}
