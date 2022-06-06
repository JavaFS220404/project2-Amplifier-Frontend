import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [{
  path:"",
  component: LoginComponent
},{
  path:"login",
  component: LoginComponent
},{
  path: "register",
  component: RegisterComponent
},{
  path: "heroes",
  component: HeroesComponent
} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
