import { Component } from '@angular/core';
import { User } from '../models/user';
import { Chart } from 'chart.js/auto';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Reservation } from '../models/reservation';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
@Component({
  selector: 'app-waiter-statistics-page',
  templateUrl: './waiter-statistics-page.component.html',
  styleUrls: ['./waiter-statistics-page.component.css']
})
export class WaiterStatisticsPageComponent {

  me:User = new User;
  myRestaurant:Restaurant = new Restaurant;
  myDuties:Reservation[] = [];

  dataY1:number[] = [];
  
  myChart:any = null;
  
  data1:any = null;

  constructor(private restaurantService:RestaurantService){}

  ngOnInit(){
    let myItem = localStorage.getItem("logged");
    if(myItem) this.me = JSON.parse(myItem);
    this.getAllData();
  }

  

  getAllData(){
    this.restaurantService.getAll().subscribe(data=>{
      if(data) {
        data.forEach(r=>{
          r.waiters.forEach(w=>{
            if(w.username == this.me.username) this.myRestaurant = r;
          })
        })
        let duties:Reservation[] = [];
        this.myRestaurant.reservations.forEach(r=>{
        if(r.status == 'accepted' && r.waiter == this.me.username ) duties.push(r);
        })
        this.myDuties = duties;
        this.dataY1 = this.getChart1Data();
        this.updateChartData1();
        this.updateChartData2();
      }
      else alert("error");
    })
  }




  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"],
    datasets: [
      { data: [], label: 'Broj gostiju po danu' }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartLegend = true;
  public barChartPlugins = [];

  

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: this.pieChartLabels,
    datasets: this.pieChartDatasets
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];


  



  updateChartData1() {
    this.barChartData = {
      labels: ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"],
      datasets: [
        { data: this.dataY1, label: 'Series A' }
      ]
    };
  }




  getChart1Data(){
    let dataSet:number[] = [0,0,0,0,0,0,0];
    this.myDuties.forEach(dd=>{
      let date:string[] = dd.dateAndTime.split('/',2)[0].split('-',3);
      let D:Date = new Date;
      D.setFullYear(parseInt(date[0]), (parseInt(date[1])-1)%12, parseInt(date[2]));
      dataSet[D.getDay()] += dd.persons;
    })
    return dataSet;
  }

 

  updateChartData2() {
    let names:string[] = [];
    let values:number[] = [];

    this.myRestaurant.waiters.forEach(w=>{
      names.push(w.username);
    })
    this.myRestaurant.reservations.forEach(r=>{
      let x = names.indexOf(r.waiter);
      if (values[x] === undefined) {
        values[x] = 0;
      } else {
        values[x] += r.persons;
      }
    })

    this.pieChartLabels = names;
    this.pieChartDatasets = [{ data: values }];

      // Ensure the chart data object is updated as well
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: this.pieChartDatasets
      };

    
  }
  
}
