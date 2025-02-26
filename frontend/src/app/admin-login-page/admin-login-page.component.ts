import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent {

  username:string = "";
  password:string = "";

  constructor(private userService:UserService, private router:Router){}

  admin_login(){
    let cipherText = this.password;
    // cipherText = crypto.AES.encrypt(this.password, "mySecretKey123").toString();

    this.userService.adminLogin(this.username, cipherText).subscribe(data=>{
      if(data){
        localStorage.setItem("logged", JSON.stringify(data));
        this.router.navigate(["admin-main-page"]);
      }
      else alert('error');
    })
  }
}
