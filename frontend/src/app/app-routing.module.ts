import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { PasswordChangePageComponent } from './password-change-page/password-change-page.component';
import { GuestProfilePageComponent } from './guest-profile-page/guest-profile-page.component';
import { GuestRestaurantPageComponent } from './guest-restaurant-page/guest-restaurant-page.component';
import { GuestReservationsPageComponent } from './guest-reservations-page/guest-reservations-page.component';
import { GuestDeliveryPageComponent } from './guest-delivery-page/guest-delivery-page.component';
import { GuestRestaurantDetailsPageComponent } from './guest-restaurant-details-page/guest-restaurant-details-page.component';
import { WaiterProfilePageComponent } from './waiter-profile-page/waiter-profile-page.component';
import { WaiterReservationsPageComponent } from './waiter-reservations-page/waiter-reservations-page.component';
import { WaiterDeliveryPageComponent } from './waiter-delivery-page/waiter-delivery-page.component';
import { WaiterStatisticsPageComponent } from './waiter-statistics-page/waiter-statistics-page.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';

const routes: Routes = [
  {path:"", component: HomePageComponent},
  {path:"login-page", component: LoginPageComponent},
  {path:"register-page", component: RegisterPageComponent},
  {path:"admin-login-page", component: AdminLoginPageComponent},
  {path:"password-reset-page", component: PasswordResetPageComponent},
  {path:"password-change-page", component: PasswordChangePageComponent},
  {path:"guest-profile-page", component: GuestProfilePageComponent},
  {path:"guest-restaurant-page", component:GuestRestaurantPageComponent},
  {path:"guest-reservations-page", component:GuestReservationsPageComponent},
  {path:"guest-delivery-page", component:GuestDeliveryPageComponent},
  {path:"guest-restaurant-details-page", component:GuestRestaurantDetailsPageComponent},
  {path:"waiter-profile-page", component:WaiterProfilePageComponent},
  {path:"waiter-reservations-page", component:WaiterReservationsPageComponent},
  {path:"waiter-delivery-page", component:WaiterDeliveryPageComponent},
  {path:"waiter-statistics-page", component:WaiterStatisticsPageComponent},
  {path:"admin-main-page", component:AdminMainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
