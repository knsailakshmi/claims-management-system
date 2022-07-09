import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin',{
      userid:username,
      password:password
    });
  }

 

  register(username: string, email: string, password: string,phoneNo:string,address:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name:username,
      email:email,
      password:password,
      phoneNo:phoneNo,
      address:address
    }, httpOptions);
  }
  getUser(id:string):Observable<any>{
    return this.http.get(AUTH_API+id);
  }
}
