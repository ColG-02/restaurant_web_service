import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  

  newUser:User = new User;

  selectedPicture:File | null = null;


  minImageWidth = 100;
  minImageHeight = 100;
  maxImageWidth = 300;
  maxImageHeight = 300;


  errorMail:string = "";
  errorUser:string = "";

  constructor(private userService:UserService, private router:Router){}
                            
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z][a-zA-Z\d@$!%*?&]{5,9}$/);


  register(){
    if(this.newUser.firstname == "" || this.newUser.lastname == "" || this.newUser.username == "" || this.newUser.password == "" ||
      this.newUser.question == "" || this.newUser.answer == "" || this.newUser.gender == "" || this.newUser.address == "" ||
      this.newUser.phone == "" || this.newUser.email == "" || this.newUser.card == "") alert("Popunite sva polja");
    else if(!this.passwordRegex.test(this.newUser.password)) alert("Lozinka nije odgovarajuceg formata");  
    else{

      //let cipherText = crypto.AES.encrypt(this.newUser.password, "mySecretKey123").toString();
      //let plaintext = crypto.AES.decrypt(cipherText, "mySecretKey123").toString(crypto.enc.Utf8);

      //this.newUser.password = cipherText;

      this.errorMail, this.errorUser = "";
      this.newUser.active = -1;
      this.newUser.type = 'gost';
      this.userService.register(this.newUser).subscribe((data:any)=>{
      this.errorMail = data['errorMail'], this.errorUser = data['errorUser'];
      
      if(this.errorMail == "E-mail already taken" && this.errorUser == "Username already taken") alert("Vec postoji nalog sa datom email adresom i korisnickim imenom");
      else if(this.errorMail == "E-mail already taken") alert("Vec postoji nalog sa datom email adresom");
      else if(this.errorUser == "Username already taken") alert("Vec postoji nalog sa datim korisnickim imenom");
      else if(data != null) {
        alert("Registrovanje uspesno!");
        this.router.navigate(["login-page"]);
      }
      else alert("error");
    })
    }
  }

  uploadPicture(event: any){
    this.selectedPicture = event.target.files[0] as File;
    //this.newUser.profilePicture = URL.createObjectURL(this.selectedPicture);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedPicture);
    reader.onload = () => {
      this.newUser.profilePicture = reader.result as string;
      const img = new Image();
      img.src = this.newUser.profilePicture;

      img.onload = () => {
        if (img.width > this.maxImageWidth || img.height > this.maxImageHeight
          || img.width < this.minImageWidth || img.height < this.minImageHeight) {
                alert(`Image dimensions should not exceed ${this.maxImageWidth}x${this.maxImageHeight} pixels.`);
              } else {
                console.log(img.src);
              }
      }
    };
  }



}
