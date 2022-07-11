import { Injectable } from '@angular/core';
const TOKEN_KEY='auth-token'
const USER_KEY='auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut():void{
    window.localStorage.clear()
    // window.sessionStorage.clear();
  }
  public saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken():string|null{
    return window.localStorage.getItem(TOKEN_KEY);
    // return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user:any):void{
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY,JSON.stringify(user));
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  public getUser():any{
    // const user=window.sessionStorage.getItem(USER_KEY);
    const user=window.localStorage.getItem(USER_KEY)
    if(user){
      return JSON.parse(user)
    }
    return {};
  }
  public updateUser():any{
        
  }

  public tokenExpired(token: string):boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
