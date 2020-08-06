import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'loginAdmin',component:LoginComponent},
  {path:'', redirectTo:'/loginAdmin',pathMatch:'full'},
  // {path:'homeAdmin',component: HomeComponent}
  {path:'homeAdmin',component: HomeComponent,canActivate:[AuthGuard]}
  // {path:'/admin/home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
