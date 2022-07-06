import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string = '';
  role:string='ROLE_USER';
  user:any;
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription();
  constructor(private authService: AuthService,private tokenStorage:TokenStorageService,private router:Router) {}

  ngOnInit() {
    // this.authSubscription = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = user ? true : false;
    //   this.username = user ? user.username : '';
    // });
    this.user=this.tokenStorage.getUser()
    this.isAuthenticated=this.user.name?true:false
    this.role=this.user.roles[0];
   
    
    this.username=this.user.name    

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    // this.authService.logout();
    console.log("insdie the onlOgout");
    
    this.router.navigate(['./home']);
    this.tokenStorage.signOut();
  }
}
