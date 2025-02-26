import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.css']
})
export class PasswordResetPageComponent {

  question:string = "";
  username:string = "";
  answer:string = "";

  constructor(private userService:UserService, private router:Router){}


  getQuestion(){
    this.userService.getQuestion(this.username).subscribe(data=>{
      if(data) this.question = data;
      else alert("Nepostojece korisnicko ime");
    })
  }

  goToReset(){
    this.userService.goToReset(this.username, this.answer).subscribe(data=>{
      if(data){
        localStorage.setItem("logged", JSON.stringify(data));
        this.router.navigate(["password-change-page"]);
      }
      else alert("Netacan odgovor na pitanje");
    })
  }

}
