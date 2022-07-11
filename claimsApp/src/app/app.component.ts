import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { TokenStorageService } from "./_services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  error: string | null = null;

  // constructor(private authService: AuthService) {}
  constructor(private tokenStorage:TokenStorageService,private router:Router){}

  ngOnInit() {
    // this.authService.timeout.subscribe((isTimeOut) => {
    //   if (isTimeOut)
    //     this.error = 'Your session is expired. Please Login again!';
    // });
    // this.authService.autoLogin();
    const token=this.tokenStorage.getToken();
    if(token!=null){
      console.log("inside the token")
      if(this.tokenStorage.tokenExpired(token)){
               this.error="Your session is expired.Please Login again!";
               this.tokenStorage.signOut()
               this.router.navigate(['./home']);
               
      }
    }
    
    
    
  }

  handleError() {
    this.error = null;
  }
}
