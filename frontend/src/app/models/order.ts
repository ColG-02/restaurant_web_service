import { Meal } from "./meal";

export class Order{
    restaurant:string = "";
    name:string = "";
    status:string = "";
    expectedDeliveryTime:string = "";
    dateAndTime:string = "";
    bill:number = 0;
    meals:Meal[]=[];
}