import { Review } from "./review";

export class Reservation{
    dateAndTime: string = "";
    persons:number = 0;
    extras:string = "";
    name:string = "";
    restaurant:string = "";
    served:boolean = false;
    review:Review = new Review;
    status:string = "";
    message:string = "";
    tableId:number = 0;
    waiter:string = "";
    time:number = 180;
}
