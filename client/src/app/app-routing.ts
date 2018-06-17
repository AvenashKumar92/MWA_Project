import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from './registration/registration.component';


const MY_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '/' }
];


export const appRoutes = RouterModule.forRoot(MY_ROUTES);
