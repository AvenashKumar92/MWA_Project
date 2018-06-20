import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Globals } from '../globals';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message="";
  registrationForm: FormGroup;

  //Auto complete textbox
  expertiseCtrl: FormControl;
  filteredExpertise: Observable<any[]>;
  allExpertise:any[]=Globals.Topics;
  selectedExpertise:any[]=[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private regService:RegistrationService
    ) {
    this.registrationForm = formBuilder.group({
      'fname': ['', [Validators.required]],
      'lname': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(5)]],
      'cpassword': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, Validators.email]],
      'contact': ['', [Validators.required]],
      'portfolio': [''],
      'subscriptions':['', [Validators.required]],
      'company': formBuilder.group({
        'designation': [''],
        'cname': [''],
        'city': [''],
        'state': [''],
        'country': ['']
      })
    }, { validator: this.cpasswordMatchValidator });

    this.expertiseCtrl = new FormControl();
    this.expertiseCtrl.registerOnChange(function(){
      console.log('Ponka');
    })
    this.filteredExpertise = this.expertiseCtrl.valueChanges
      .pipe(
        startWith(''),
        map(expert => expert ? this.filterExpertise(expert) : this.allExpertise.slice())
      );
      
  }
  filterExpertise(name) {
    return this.allExpertise.filter(expert =>{
      return expert.viewValue.toLowerCase().indexOf(name.toLowerCase()) === 0
    });
  }

  onKeyDown(event){
    if(event.key==="Enter"){
      let expertValue=event.target.value;
      if(expertValue!=""){
        this.selectedExpertise.push(expertValue);
      }
    }
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
    
    //Split subscriptions
    this.registrationForm.value.subscriptions=this.registrationForm.value.subscriptions.split(',');
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
