import { Reservation } from "./reservation";
import { Table } from "./table";
import { User } from "./user";

export class Restaurant {
    name:string = "";
    address: string = "";
    phone:string = "";
    type:string = "";
    waiters:User[] = [];
    reservations:Reservation[] = [];
    location:string = "";
    descritpion:string = "";
    tables:Table[] = [];
    workingHours:string = "";
}