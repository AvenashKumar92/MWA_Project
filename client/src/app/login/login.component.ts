import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  userInfo:User=new User();
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    //private userInfoService: UserInfoService, 
    private router: Router) { 
    this.myForm=formBuilder.group({
      'userData':formBuilder.group({
        'email': ['', [Validators.required, 
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password':['', [Validators.required, Validators.minLength(10)]]
      })
    })
  }

  emailValidator(control: FormControl):{[s:string]:boolean}{
    Validators.pattern
    if(control.value===''){
      return {email:true};
    }
    return null;
  }

  /*onGetData(){
    this.userInfoService.getUserInfo().subscribe((userData)=>{      
        this.userInfoService.getPosts().subscribe((posts)=>{
          this.myForm.patchValue({userData:{name: userData['name']}});
          this.myForm.patchValue({userData:{email: userData['email'].toLowerCase()}});
          this.myForm.patchValue({userData:{post: posts[0]['title']}});
        });
    });
  }*/

  onSubmit() {
    console.log('Reactive Form Data: ');
    console.log(this.myForm.value);
    
    this.router.navigateByUrl('/success');
  }

}
