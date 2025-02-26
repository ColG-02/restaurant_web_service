import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:4000";

  login(username:string, password:string){
    const data ={
      username: username,
      password: password
    }
    return this.http.post<User>(`${this.url}/users/login`, data);
  }

  adminLogin(username:string, password:string){
    const data ={
      username: username,
      password: password
    }
    return this.http.post<User>(`${this.url}/users/adminLogin`, data);
  }

  register(user:User){
    return this.http.post(`${this.url}/users/register`, user);
  }

  getQuestion(username:string){
    const data = {
      username:username
    }
    return this.http.post<string>(`${this.url}/users/getQuestion`,data);
  }
  goToReset(username:string, answer:string){
    const data = {
      username:username,
      answer:answer
    }
    return this.http.post<User>(`${this.url}/users/goToReset`,data);
  }

  changePassword(username:string, newPassword:string){
    const data = {
      username:username,
      newPassword:newPassword
    }
    return this.http.post<string>(`${this.url}/users/changePassword`,data);
  }

  editProfile(oldUsername:string, newUser:User){
    const data = {
      oldUsername:oldUsername,
      newUser:newUser
    }
    return this.http.post<User>(`${this.url}/users/editProfile`, data);
  }

  addPenaltyPoints(name:string){
    const data={
      name:name
    }
    return this.http.post<string>(`${this.url}/users/addPenaltyPoints`,data);
  }

  getAll(){
    return this.http.get<User[]>(`${this.url}/users/getAll`);
  }

  setActive(user:User){
    return this.http.post<string>(`${this.url}/users/setActive`,user);
  }



}
