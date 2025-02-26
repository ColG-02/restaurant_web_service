import { Component } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Reservation } from '../models/reservation';
import { Table } from '../models/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-waiter-reservations-page',
  templateUrl: './waiter-reservations-page.component.html',
  styleUrls: ['./waiter-reservations-page.component.css']
})
export class WaiterReservationsPageComponent {

  private canvas:any;
  private ctx:any;

  me:User = new User;

  allRestauants:Restaurant[] = [];
  myRestaurant:Restaurant = new Restaurant;

  denyMessage:string = "";

  pendingReservations:Reservation[] = [];
  currReservation:Reservation = new Reservation;

  myDuties:Reservation[] = [];


  constructor(private restaurantService:RestaurantService, private userService:UserService){}

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getRestaurants();
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }
  

  getRestaurants(){
    this.restaurantService.getAll().subscribe(data=>{
      if(data) {
        this.allRestauants = data;
        this.allRestauants.forEach(r=>{
          r.waiters.forEach(w=>{
            if(w.username == this.me.username) this.myRestaurant = r;
          })
        })
        this.getDuties();
      }
      else alert("error");
    })
  }

  getDuties(){
    let duties:Reservation[] = [];
    this.myRestaurant.reservations.forEach(r=>{
      if(r.status == 'accepted' && r.waiter == this.me.username 
    //  && this.inRestaurantCheck(r.dateAndTime)
    ) duties.push(r);
    })
    this.myDuties = duties;
  }

  getPendingReservations(){
    let pending:Reservation[] = [];
    this.myRestaurant.reservations.forEach(r=>{
      if(r.status == 'requested') pending.push(r);
    })
    pending.sort((a,b)=>{
      if(a.dateAndTime > b.dateAndTime) return -1;
      else if (a.dateAndTime < b.dateAndTime) return 1;
      else return 0;
    })
    return pending;
  }


  selectReservation(reservation:Reservation){
    this.currReservation = reservation;
    this.drawCanvas(this.myRestaurant.tables);
    this.redrawCanvas(this.occupiedTables());
  }

  accept(t:string){
    let tt:string[] = t.split('-',2);
    if(parseInt(tt[1]) < this.currReservation.persons) alert("Sto prima manje osoba od broja zahtevanog u rezervaciji");
    else{
      this.currReservation.tableId = parseInt(tt[0]);
      this.currReservation.status = "accepted";
      this.currReservation.waiter = this.me.username;

      this.restaurantService.acceptReservation(this.currReservation).subscribe(data=>{
      if(data == "ok") alert("Rezervacija prihvacena");
      else alert("error");
    })
    }
  }

  deny(){
    this.currReservation.status = "denied";
    this.currReservation.message = this.denyMessage;

    this.restaurantService.denyReservation(this.currReservation).subscribe(data=>{
      if(data == "ok") alert("Rezervacija odbijena");
      else alert("error");
    })
  }

  availableTables(){
    let tbls:Table[] = [];
    this.myRestaurant.tables.forEach(t=>{
      let free:Boolean = true;
      this.myRestaurant.reservations.forEach(r=>{
        if(this.hourRange(r.dateAndTime,this.currReservation.dateAndTime,r.time,this.currReservation.time) &&
          r.status == "accepted" && r.tableId == t.id && t.id != 0) free = false;
      })
      if(free && t.id != 0) tbls.push(t);
    })
    return tbls;
  }

  hourRange(time1:string, time2:string, t1:number, t2:number){
    if(time1 == "" || time2 == "") return false;
    //format 2024-07-03/01:09
    let lower:Date = new Date;
    let upper:Date = new Date;

    let date:string[] = time1.split('/',2)[0].split('-',3);
    let time:string[] = time1.split('/',2)[1].split(':',2);

    lower.setFullYear(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
    upper.setFullYear(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));

    lower.setHours(parseInt(time[0]));
    upper.setHours(parseInt(time[0]));

    lower.setMinutes(parseInt(time[1]) - t1);
    upper.setMinutes(parseInt(time[1]) + t2);

    let myDate:Date = new Date;

    let dateD:string[] = time2.split('/',2)[0].split('-',3);
    let timeT:string[] = time2.split('/',2)[1].split(':',2);

    myDate.setFullYear(parseInt(dateD[0]), parseInt(dateD[1]), parseInt(dateD[2]));
    myDate.setHours(parseInt(timeT[0]));
    myDate.setMinutes(parseInt(timeT[1]));


    // console.log(lower);
    // console.log(myDate);
    // console.log(upper);

    if(lower >= myDate || myDate >= upper) return false;
    else return true;
  }

  checkReservationDate(){
    //format 2024-07-03/01:09
    let today = new Date();
    today.setMinutes(today.getMinutes() - 30);
     
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     var mi = String(today.getMinutes()).padStart(2, '0');
     var hr = String(today.getHours()).padStart(2, '0');
 
     let date = yyyy + '-' + mm + '-' + dd + '/' + hr + ':' + mi;
 
    return date;
  }

  confirmGuests(reservation:Reservation){
    reservation.served = true;
    this.restaurantService.confirmGuests(reservation).subscribe(data=>{
      if(data == "ok") alert("Potvrdjen dolazak gostiju");
      else alert("error");
    })
  }

  freeTable(reservation:Reservation){
    reservation.status = "denied";
    reservation.message = "Gosti se nisu pojavili";
    reservation.tableId = 0;
    this.restaurantService.freeTable(reservation).subscribe(data=>{
      if(data == "ok"){
        this.userService.addPenaltyPoints(reservation.name).subscribe(pen=>{
          if(pen == 'ok') alert("Oslobodjen sto");
          else("error");
        })
        
      } 
      else alert("error");
    })
  }

  extendReservation(reservation:Reservation){
    reservation.time = 240;
    this.restaurantService.extendReservation(reservation).subscribe(data=>{
      if(data == "ok") alert("Produzen boravak gostiju za sat vremena");
      else alert("error");
    })
  }

  inRestaurantCheck(resTime:string){
    let lower:Date = new Date;
    let upper:Date = new Date;

    let date:string[] = resTime.split('/',2)[0].split('-',3);
    let time:string[] = resTime.split('/',2)[1].split(':',2);

    lower.setFullYear(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]));
    upper.setFullYear(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]));

    lower.setHours(parseInt(time[0]));
    upper.setHours(parseInt(time[0]));

    lower.setMinutes(parseInt(time[1]));
    upper.setMinutes(parseInt(time[1]) + 180);

    
    let now = new Date();

    console.log(lower);
    console.log(now);
    console.log(upper);

    if(lower < now && now < upper) return true;
    else return false;
  }


  drawCanvas(tables:Table[]) {
    // const canvas = document.getElementById("myCanvas") as HTMLCanvasElement; // Explicitly cast to HTMLCanvasElement
    // const this.ctx = canvas.getContext("2d");

    if(this.ctx){
      tables.forEach(t=>{
        if(t.type == "table"){
          let cords:string[] = t.position.split(",",2);
          this.ctx.beginPath();
          this.ctx.arc(parseInt(cords[0]), parseInt(cords[1]),parseInt(t.size) , 0, 2 * Math.PI);
          this.ctx.fillStyle = "white";
          this.ctx.fill();
          this.ctx.stroke();

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText(t.capacity.toString(),textCords[0],textCords[1]);
        }
        else if(t.type == "kitchen"){
          let cords:string[] = t.position.split(",",2);
          let size:string[] = t.size.split(",",2);

          this.ctx.fillStyle = "rgb(255, 204, 0)";
          this.ctx.fillRect(parseInt(cords[0]), parseInt(cords[1]),parseInt(size[0]), parseInt(size[1]));

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText("Kuhinja",textCords[0],textCords[1]);
        }
        else if (t.type == "toilet"){
          let cords:string[] = t.position.split(",",2);
          let size:string[] = t.size.split(",",2);

          this.ctx.fillStyle = "rgb(153, 204, 255)";
          this.ctx.fillRect(parseInt(cords[0]), parseInt(cords[1]),parseInt(size[0]), parseInt(size[1]));

          let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Arial";
          this.ctx.fillText("Toalet",textCords[0],textCords[1]);
        }
      })

      
    }
    
   }

  getTextCords(type:string, c:string, s:string){
    let cords:string[] = c.split(",",2);
    if(type == "table") return [parseInt(cords[0])-8,parseInt(cords[1])+10];
    else{
      let size:string[] = s.split(",",2);
      let center:number[] = [(2*parseInt(cords[0])+parseInt(size[0]))/2-30,(2*parseInt(cords[1])+parseInt(size[1]))/2+10];
      return center;
    }
  }

  occupiedTables(){
    let tbls:Table[] = [];
    this.myRestaurant.tables.forEach(t=>{
      let free:Boolean = false;
      this.myRestaurant.reservations.forEach(r=>{
        if(this.hourRange(r.dateAndTime,this.currReservation.dateAndTime,r.time,this.currReservation.time) &&
          r.status == "accepted" && r.tableId == t.id && t.id != 0) free = true;
      })
      if(free && t.id != 0) tbls.push(t);
    })
    return tbls;
  }

  redrawCanvas(tables:Table[]){
    if(this.ctx){
      tables.forEach(t=>{
        if(t.type == "table"){
          let cords:string[] = t.position.split(",",2);
          this.ctx.beginPath();
          this.ctx.arc(parseInt(cords[0]), parseInt(cords[1]),parseInt(t.size) , 0, 2 * Math.PI);
          this.ctx.fillStyle = "red";
          this.ctx.fill();
          // this.ctx.stroke();

          // let textCords:number[] = this.getTextCords(t.type, t.position, t.size);
          // this.ctx.fillStyle = "black";
          // this.ctx.font = "20px Arial";
          // this.ctx.fillText(t.capacity.toString(),textCords[0],textCords[1]);
        }
        })
    }
  }

}
