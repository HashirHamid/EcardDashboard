import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddResellerComponent } from './component/add-reseller/add-reseller.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { ResellerDashboardComponent } from './component/reseller-dashboard/reseller-dashboard.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'addUser', component : AddResellerComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'resellerDash', component : ResellerDashboardComponent},
  {path: 'login', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
