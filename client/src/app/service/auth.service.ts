import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Globals} from '../globals';
import {map} from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';
import { DataRowOutlet } from '@angular/cdk/table';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient, private router:Router) {
        
    }
      
    login(email:string, password:string) {
        this.http.post(Globals.LoginAPI, {email, password}).
            subscribe(
                (data)=>{  
                    console.log('Authentication Service: Storing token in local storage.........');
                    console.log("Authentication Service: JWT - Token "+data['token']);                  
                    localStorage.setItem('token', data['token']);
                    console.log("Authentication Service: JWT-Token stored.");
                    console.log("Authentication Service: Redirecting to home........");
                    this.router.navigateByUrl('/home'); 
                },
                (error)=>{
                    console.log(error);
                });
    }

    loggedIn(){
        return tokenNotExpired();
    }

    logout(){
        console.log("Authentication Service: Removing JWT-Token from local storage....");
        localStorage.removeItem('token');
        console.log("Authentication Service: JWT-Token removed.");
        console.log("Authentication Service: Redirecting to login........");
        this.router.navigateByUrl('/login'); 
    }

    getToken():string{
        return localStorage.getItem('token');
    }
}