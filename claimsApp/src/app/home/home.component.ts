import { Component,OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  token:string|null=null;
  constructor(private tokenStorage:TokenStorageService,private router:Router){
     
  }
  ngOnInit():void{
      this.token= this.tokenStorage.getToken();
          if (this.token) {
        this.router.navigate(['./memberportal']);
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
