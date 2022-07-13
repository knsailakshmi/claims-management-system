import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService:TokenStorageService,private router:Router){}

  canActivate():boolean {
    if(this.tokenService.getToken()!=null){
      return true
    }else{
      this.router.navigate(['./home'])
      return false
    }
  }
  
}
