import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-guest-profile-page',
  templateUrl: './guest-profile-page.component.html',
  styleUrls: ['./guest-profile-page.component.css']
})
export class GuestProfilePageComponent {


  loggedUser:User = new User;
  newUser:User = new User;
  //editedUser:User = new User;

  selectedPicture:File | null = null;


  minImageWidth = 100;
  minImageHeight = 100;
  maxImageWidth = 300;
  maxImageHeight = 300;

  img = new Image;

  constructor(private userService:UserService, private router:Router){}

  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z][a-zA-Z\d@$!%*?&]{5,9}$/);

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.loggedUser = JSON.parse(myItem);
    if(this.loggedUser.profilePicture != "") this.img.src = this.loggedUser.profilePicture;
    else this.img.src = "assets/default_profile_picture.png";
  }

  editProfile(){
    if(this.newUser.username == "") this.newUser.username = this.loggedUser.username;
    if(this.newUser.password == "") this.newUser.password = this.loggedUser.password;
    else if(this.newUser.password != "") {
      if(!this.passwordRegex.test(this.newUser.password)) alert("Lozinka nije odgovarajuceg formata");
      else{
        //let cipherText = crypto.AES.encrypt(this.newUser.password, "mySecretKey123").toString();
        //this.newUser.password = cipherText;
        //this.newUser.password = this.loggedUser.password;
      }
    }
    if(this.newUser.question == "") this.newUser.question = this.loggedUser.question;
    if(this.newUser.answer == "") this.newUser.answer = this.loggedUser.answer;
    if(this.newUser.firstname == "") this.newUser.firstname = this.loggedUser.firstname;
    if(this.newUser.lastname == "") this.newUser.lastname = this.loggedUser.lastname;
    if(this.newUser.gender == "") this.newUser.gender = this.loggedUser.gender;
    if(this.newUser.address == "") this.newUser.address = this.loggedUser.address;
    if(this.newUser.phone == "") this.newUser.phone = this.loggedUser.phone;
    if(this.newUser.email == "") this.newUser.email = this.loggedUser.email;
    if(this.newUser.card == "") this.newUser.card = this.loggedUser.card;
    if(this.newUser.profilePicture == "") this.newUser.profilePicture = this.loggedUser.profilePicture;
    if(this.newUser.type == "") this.newUser.type = this.loggedUser.type;

    this.userService.editProfile(this.loggedUser.username, this.newUser).subscribe(data=>{
      if(data){
        localStorage.setItem("logged", JSON.stringify(data));
        //this.router.navigate(["guest-profile-page"]);
        this.ngOnInit();
      }
      else alert("error");
    })

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

}
