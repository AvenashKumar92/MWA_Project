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
        'fname':['Avenash', [Validators.required]],
        'lname':['Kumar', [Validators.required]],
        'password':['password', [Validators.required]],
        'cpassword':['password', [Validators.required]],
        'email':['av.kumar@mum.edu', [Validators.required, Validators.email]],
        'contact':['3473246779', [Validators.required]],
        'portfolio':['https://www.linkedin.com/in/avenashkumarse1993'],
        'company':formBuilder.group({
          'designation':['Software Engineer'],
          'cname':['NASA'],
          'city':['California'],
          'state':['California'],
          'country':['USA']
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
