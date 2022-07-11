import { Component,OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  token:string|null=null;
  user:any='';
  roles:string='';
  constructor(private tokenStorage:TokenStorageService,private router:Router){
     
  }
  ngOnInit():void{
      this.token= this.tokenStorage.getToken();
      console.log(this.token);
      
      this.user=this.tokenStorage.getUser();
      console.log(this.user);
      console.log("After the log out button");
      
      
      this.roles=this.user.roles[0]
        
        if (this.token && this.roles=='ROLE_USER'){
          console.log("inside the log out member portal");
          
        this.router.navigate(['./memberportal']);
      }
      // else if (this.token && this.roles=='ROLE_ADMIN') {
      //   this.router.navigate(['./adminportal']);
      // }
      else if(this.token && this.roles=='ROLE_ADMIN'){
        console.log("inside the adminportal");
        
        this.router.navigate(['./adminportal']);
      }
    
  }
  onScrollTo(element: HTMLElement) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - 45;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
