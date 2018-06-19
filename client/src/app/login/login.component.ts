import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import {AuthService} from '../service/auth.service'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  userInfo:User=new User();
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private router: Router) { 
    this.loginForm=formBuilder.group({
        'email': ['', [Validators.required, 
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password':['', [Validators.required]]
      
    })
  }

  onSubmit() {
    console.log('LoginComponent: Application login.......');
    let email:string=this.loginForm.value.email;
    let password:string=this.loginForm.value.password;
    this.auth.login(email, password);
  }
}
