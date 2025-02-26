import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-password-change-page',
  templateUrl: './password-change-page.component.html',
  styleUrls: ['./password-change-page.component.css']
})
export class PasswordChangePageComponent {

  passwordN:string = "";
  passwordR:string = "";
  loggedUser:User = new User;

  constructor(private userService:UserService, private router:Router){}

  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z][a-zA-Z\d@$!%*?&]{5,9}$/);


  //key = CryptoJS.enc.Utf8.parse('1234567890123456');
  //iv = CryptoJS.enc.Hex.parse('0123456789abcdef'); // Fixed IV for example

  // cfg = {
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7,
  //   iv: this.iv
  // };

  changePassword(){
    if(this.passwordN != this.passwordR) alert("Unete lozinke se ne poklapaju!");
    else if (!this.passwordRegex.test(this.passwordN)) alert("Lozinka nije odgovarajuceg formata");
    else{
      let myItem = localStorage.getItem("logged");
      if(myItem) this.loggedUser = JSON.parse(myItem);

      //let cipherText = crypto.AES.encrypt(this.passwordN, this.key, this.cfg).toString();
      

      this.userService.changePassword(this.loggedUser.username, this.passwordN).subscribe(data=>{
        if(data == "ok"){
          alert("Lozinka je uspesno promenjena!");
        }
        else alert("error");
      })
    }
    
  }

}