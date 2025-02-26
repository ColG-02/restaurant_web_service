import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';


import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { PasswordChangePageComponent } from './password-change-page/password-change-page.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { GuestProfilePageComponent } from './guest-profile-page/guest-profile-page.component';
import { GuestRestaurantPageComponent } from './guest-restaurant-page/guest-restaurant-page.component';
import { GuestReservationsPageComponent } from './guest-reservations-page/guest-reservations-page.component';
import { GuestDeliveryPageComponent } from './guest-delivery-page/guest-delivery-page.component';
import { GuestRestaurantDetailsPageComponent } from './guest-restaurant-details-page/guest-restaurant-details-page.component';
import { WaiterNavbarComponent } from './waiter-navbar/waiter-navbar.component';
import { WaiterProfilePageComponent } from './waiter-profile-page/waiter-profile-page.component';
import { WaiterReservationsPageComponent } from './waiter-reservations-page/waiter-reservations-page.component';
import { WaiterDeliveryPageComponent } from './waiter-delivery-page/waiter-delivery-page.component';
import { WaiterStatisticsPageComponent } from './waiter-statistics-page/waiter-statistics-page.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminLoginPageComponent,
    PasswordResetPageComponent,
    PasswordChangePageComponent,
    GuestNavbarComponent,
    GuestProfilePageComponent,
    GuestRestaurantPageComponent,
    GuestReservationsPageComponent,
    GuestDeliveryPageComponent,
    GuestRestaurantDetailsPageComponent,
    WaiterNavbarComponent,
    WaiterProfilePageComponent,
    WaiterReservationsPageComponent,
    WaiterDeliveryPageComponent,
    WaiterStatisticsPageComponent,
    AdminMainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
