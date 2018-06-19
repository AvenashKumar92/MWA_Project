import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message="";
  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private regService:RegistrationService
    ) {
    this.registrationForm = formBuilder.group({
      'fname': ['Avenash', [Validators.required]],
      'lname': ['Kumar', [Validators.required]],
      'password': ['password', [Validators.required]],
      'cpassword': ['password', [Validators.required]],
      'email': ['av.kumar@mum.edu', [Validators.required, Validators.email]],
      'contact': ['3473246779', [Validators.required]],
      'portfolio': ['https://www.linkedin.com/in/avenashkumarse1993'],
      'company': formBuilder.group({
        'designation': ['Software Engineer'],
        'cname': ['NASA'],
        'city': ['California'],
        'state': ['California'],
        'country': ['USA']
      })
    }, { validator: this.cpasswordMatchValidator });
  }

  ngOnInit() {
  }



  cpasswordMatchValidator(group: FormGroup) {
    let password: string = '';
    let cpassword: string = '';
    for (var idx in group.controls) {

      if (idx == 'password') {
        password = group.controls[idx].value;
      }
      if (idx == 'cpassword') {
        cpassword = group.controls[idx].value;
      }
    }

    if (password == cpassword) {
      return null;
    }

    return {mismatch: true};
  }
  onSubmit() {
    //You don't need password property when creating registration payload
    delete this.registrationForm.value.cpassword;
    
    console.log("Registration Component: Sending data to registration service.....");
    console.log(this.registrationForm.value);
    this.regService.registerUser(this.registrationForm.value).subscribe((data)=>{
      console.log("Registration Component: User added successfully.");
      console.log("Registration Component: Redirecting to login URL.....");
      this.router.navigateByUrl('/login');
    }, (err)=>{
      console.log("Registration Component: Unable to add user in database.");
      this.message=err.error.information.message;
    });
  }
}
