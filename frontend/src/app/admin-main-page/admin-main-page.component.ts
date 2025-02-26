import { Component } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { RestaurantService } from '../services/restaurant.service';
import { Table } from '../models/table';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent {

  allUsers:User[] = [];
  allGuests:User[] = [];
  allWaiters:User[] = [];
  allRequests:User[] = [];

  waitersRestaurant:string = "";

  selectedUser:User = new User;
  newUser:User = new User;

  selectedPicture:File | null = null;

  tableLayout:File | null = null;
  tables:Table[] = [];
  newRestaurant:Restaurant = new Restaurant;

  selectedRestaurant:Restaurant = new Restaurant;
  opening:string = "";
  closing:string = "";


  minImageWidth = 100;
  minImageHeight = 100;
  maxImageWidth = 300;
  maxImageHeight = 300;

  img = new Image;

  allRestaurants:Restaurant[] = [];


  constructor(private userService:UserService, private restaurantService:RestaurantService){}

  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z][a-zA-Z\d@$!%*?&]{5,9}$/);

  ngOnInit(){
    this.getAllUsers();
    this.getAllRestaurants();
  }

  getAllUsers(){
    this.userService.getAll().subscribe(data=>{
      if(data){
        this.allUsers = data;
        this.allUsers.forEach(u=>{
          if(u.type == "gost" && u.active >= 0) this.allGuests.push(u);
          if(u.type == "konobar" && u.active >= 0) this.allWaiters.push(u);
          if(u.type == "gost" && u.active == -1) this.allRequests.push(u);
        })
      } 
      else alert("error");
    })
  }

  getAllRestaurants(){
    this.restaurantService.getAll().subscribe(data=>{
      if(data) this.allRestaurants = data;
      else alert("error");
    })
  }

  selectUser(user:User){
    this.selectedUser = user;
  }


  uploadPicture(event: any){
    this.selectedPicture = event.target.files[0] as File;
    //this.newUser.profilePicture = URL.createObjectURL(this.selectedPicture);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedPicture);
    reader.onload = () => {
      let tmp = reader.result as string;
      const img = new Image();
      img.src = tmp;

      img.onload = () => {
        if (img.width > this.maxImageWidth || img.height > this.maxImageHeight
          || img.width < this.minImageWidth || img.height < this.minImageHeight) {
                alert(`Image dimensions should not exceed ${this.maxImageWidth}x${this.maxImageHeight} pixels.`);
              } else {
                this.newUser.profilePicture = reader.result as string;
              }
      }
    };
  }

  getTableLayout(event: any) {
    this.tableLayout = event.target.files[0] as File;

    if(this.tableLayout){
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string);
          this.tables = result; 
          //console.log(this.tables);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(this.tableLayout);
    }
  }


  editProfile(){
    if(this.newUser.username == "") this.newUser.username = this.selectedUser.username;
    if(this.newUser.password == "") this.newUser.password = this.selectedUser.password;
    else if(this.newUser.password != "") {
      if(!this.passwordRegex.test(this.newUser.password)) alert("Lozinka nije odgovarajuceg formata");
      else{
        // let cipherText = crypto.AES.encrypt(this.newUser.password, "mySecretKey123").toString();
        // this.newUser.password = cipherText;
      }
    }
    if(this.newUser.question == "") this.newUser.question = this.selectedUser.question;
    if(this.newUser.answer == "") this.newUser.answer = this.selectedUser.answer;
    if(this.newUser.firstname == "") this.newUser.firstname = this.selectedUser.firstname;
    if(this.newUser.lastname == "") this.newUser.lastname = this.selectedUser.lastname;
    if(this.newUser.gender == "") this.newUser.gender = this.selectedUser.gender;
    if(this.newUser.address == "") this.newUser.address = this.selectedUser.address;
    if(this.newUser.phone == "") this.newUser.phone = this.selectedUser.phone;
    if(this.newUser.email == "") this.newUser.email = this.selectedUser.email;
    if(this.newUser.card == "") this.newUser.card = this.selectedUser.card;
    if(this.newUser.profilePicture == "") this.newUser.profilePicture = this.selectedUser.profilePicture;
    if(this.newUser.type == "") this.newUser.type = this.selectedUser.type;

    this.userService.editProfile(this.selectedUser.username, this.newUser).subscribe(data=>{
      if(data){
        if(data) alert("Profil uspesno izmenjen");
        //this.ngOnInit();
      }
      else alert("error");
    })

  }


  deactivateUser(user:User){
    user.active = 4;
    this.userService.setActive(user).subscribe(data=>{
      if(data == "ok") alert("Korisnik deaktiviran");
      else alert("error");
    })
  }

  acceptRequest(user:User){
    user.active = 0;
    this.userService.setActive(user).subscribe(data=>{
      if(data == "ok") alert("Zahtev prihvacen");
      else alert("error");
    })
  }

  denyRequest(user:User){
    user.active = -2;
    this.userService.setActive(user).subscribe(data=>{
      if(data == "ok") alert("Zahtev odbijen");
      else alert("error");
    })
  }

  addWaiter(){
    this.newUser.active = 0;
    this.newUser.type = 'konobar';
    //console.log(this.newUser.profilePicture)
    this.userService.register(this.newUser).subscribe(data=>{
      if(data != null) {
        this.restaurantService.addWaiter(this.waitersRestaurant,this.newUser).subscribe(tmp=>{
          if(tmp == "ok") alert("Uspesno dodavanje konobara!");
          else("error");
        })
      }
      else alert("error");
    })
    //console.log(this.waitersRestaurant);
  }

  addRestaurant(){
    this.newRestaurant.tables = this.tables;
    this.restaurantService.addRestaurant(this.newRestaurant).subscribe(data=>{
      if(data) alert("Uspesno dodavanje");
      else alert("error");
    })
  }

  selectRestaurant(restaurant:Restaurant){
    this.selectedRestaurant = restaurant;
  }

  setWorkingHours(){
    let hours:string = this.opening + "-" + this.closing;
    this.restaurantService.setWorkingHours(hours, this.selectedRestaurant.name).subscribe(data=>{
      if(data == "ok") alert("Satnica postavljena uspesno");
      else alert("error");
    })

  }

}
