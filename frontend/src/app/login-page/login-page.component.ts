import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username:string = "";
  password:string = "";


  constructor(private userService:UserService, private router:Router){}

  login(){
    if(this.username == "") alert("Unesite korisnicko ime");
    else if(this.password == "") alert ("Unesite lozinku");
    else{
      //let cipherText = crypto.AES.encrypt(this.password, "mySecretKey123").toString();

      this.userService.login(this.username, this.password).subscribe(data=>{
        if(data) {
          if(data.active == -1) alert("Zahtev za registraciju jos uvek nije prihvacen");
          else if(data.active >= 3) alert("Onemogucen pristup servisu - nalog je blokiran");
          else if(data.active == -2) alert("Zahtev za registraciju je odbijen");
          else{
            localStorage.setItem("logged", JSON.stringify(data));
          if(data.type == 'gost')this.router.navigate(["guest-profile-page"]);
          else this.router.navigate(["waiter-profile-page"]);
          //alert('Uspesno logovanje');
          }
        }
        else alert("Neispravni kredencijali, pokusajte ponovo");
      })
    }
  }

}
