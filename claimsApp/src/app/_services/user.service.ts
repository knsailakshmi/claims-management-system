import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogging:boolean=false;
  constructor() { }

  getLoginStatus():boolean{
    return this.isLogging
  }
  changeLoginStatus(status:boolean):void{
    this.isLogging=status
  }
}
