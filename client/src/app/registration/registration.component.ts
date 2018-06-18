import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,  
    private router: Router) { 
      this.registrationForm=formBuilder.group({
        'fname':['fname', [Validators.required]],
        'lname':['lname', [Validators.required]],
        'password':['password', [Validators.required]],
        'cpassword':['password', [Validators.required]],
        'email':['email@yahoo.com', [Validators.required, Validators.email]],
        'contact':['123', [Validators.required]],
        'portfolio':['portfolio'],
        'company':formBuilder.group({
          'designation':['designation'],
          'cname':['cname'],
          'city':['city'],
          'state':['state', [Validators.required]],
          'country':['country']
        })
      }, {validator: this.cpasswordMatchValidator});
    }

  ngOnInit() {
  }



  cpasswordMatchValidator(group: FormGroup) { 
    let password:string='';
    let cpassword:string='';
    for (var idx in group.controls) {
      
      if(idx=='password'){
        password=group.controls[idx].value;
      }
      if(idx=='cpassword'){
        cpassword=group.controls[idx].value;
      }
    }
    
    if (password==cpassword) {
      return null;
    }
  
    return {
      mismatch: true
    };
  }
  onSubmit() {
    //You don't need password property when creating registration payload
    delete this.registrationForm.value.cpassword;
    console.log(this.registrationForm.value);
  }
}
