import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator } from '../_helper/confiremed.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
 
  // form: any = {
    // username: null,
    // email:null,
    // password: null,
    // confirmPassword:null,
    // address:null,
    // phoneNo:null
  // };
  isLoggedIn:boolean=false
  isValidating: boolean = false;
  isLoading: boolean = false;
  error = null;
  token:string|null=null

  constructor(private authService: AuthService, private router: Router,private tokenStorageService:TokenStorageService,private fb: FormBuilder) {
    this.form=fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
   }
  
  

  ngOnInit(): void {

    this.token= this.tokenStorageService.getToken();
    if (this.token) {
  this.router.navigate(['./memberportal']);
}
  }

  get f(){
    return this.form.controls;
  }

 
  onSubmit():void {
    const {username,email,password,address,phoneNo}=this.form.value
    this.authService.register(username,email,password,phoneNo,address).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        console.log(data);
        
        this.isLoggedIn=true
        window.location.reload();
        this.error = null;
        this.router.navigate(['./memberportal']);
        
      },
      err => {
        this.isValidating = false;
        this.error = err;
      }
    );
   
    
        
    
    this.form.value.username=''
    this.form.value.password=''
    this.form.value.email=''
    this.form.value.confirmPassword=''
    this.form.value.address=''
    this.form.value.phoneNo=''
    
  }


}
