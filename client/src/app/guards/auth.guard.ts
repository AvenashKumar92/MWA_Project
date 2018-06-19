import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private auth: AuthService) {}

  canActivate(){
    console.log("Authentication Guard: Checking login status....");
    if(this.auth.loggedIn()){
      console.log("Authentication Guard: User is login");
      return true;
    }else{
      console.log("Authentication Guard: User is not login");
      console.log("Authentication Guard: Redirecting to login URL.......");
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
