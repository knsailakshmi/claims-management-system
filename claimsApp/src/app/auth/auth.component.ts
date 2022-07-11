import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


import { Subscription } from 'rxjs';
// import { AuthService } from './auth.service';
import {AuthService} from '../_services/auth.service'
import { TokenStorageService } from "../_services/token-storage.service";
import { UserService } from '../_services/user.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
 
  isLoggedIn:boolean=false
  isValidating: boolean = false;
  isLoading: boolean = false;
  error = null;
  userSubscription: Subscription = new Subscription();
  token:string|null=null
  user:any;

  constructor(private authService: AuthService, 
    private router: Router,
    private tokenStorageService:TokenStorageService,
    private fb: FormBuilder,
    private userService:UserService) {
    this.form=fb.group({
      username:['',[Validators.required]],
      password: ['',[Validators.required]],
     
    })
  }

  // ngOnInit() {
  //   this.userSubscription = this.authService.user.subscribe((user) => {
  //     if (user) {
  //       this.router.navigate(['./home']);
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.token= this.tokenStorageService.getToken();
    this.user=this.tokenStorageService.getUser();
          if (this.token && this.user.roles[0]=="ROLE_USER") {
          this.userService.changeLoginStatus(true)
        this.router.navigate(['./memberportal']);
      }else if(this.token && this.user.roles[0]=="ROLE_ADMIN"){
        this.userService.changeLoginStatus(true)
        this.router.navigate(['./adminportal']);
      }
    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  get f(){
    return this.form.controls;
  }


  // login(username: string, password: string) {
  //   this.isValidating = true;

  //   this.authService.login({ username, password }).subscribe(
  //     (response) => {
  //       this.isValidating = false;
  //       this.error = null;
  //       this.router.navigate(['./home']);
  //     },
  //     (errorMessage) => {
  //       this.isValidating = false;
  //       this.error = errorMessage;
  //     }
  //   );
  // }
  

  onSubmit():void {
    const { username, password } = this.form.value;
    console.log(username);
    console.log(password);
    // this.login(username, password);
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        console.log(data);
        
        this.isLoggedIn=true
        this.error = null;
        this.userService.changeLoginStatus(true);
        this.reloadPage();
        if(data.roles[0]=='ROLE_USER'){
        this.router.navigate(['./memberportal']);
        }else{
          this.router.navigate(['./adminportal'])
        }
      },
      err => {
        this.isValidating = false;
        this.error = err;
      }
    );
   
    
        
    
    this.form.value.username=''
    this.form.value.password=''
  }

  reloadPage(): void {
    window.location.reload();
  }

  handleError() {
    this.error = null;
  }
}
