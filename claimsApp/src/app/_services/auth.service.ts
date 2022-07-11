import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  payload:any;
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
  updateUser(form1:FormGroup,form2:FormGroup,id:string):Observable<any>{

    if(form1?.value.password!=""){
      this.payload={
        name:form1?.value.name,
        email:form1?.value.email,
        phoneNo:form2?.value.mobileNo,
        address:form2?.value.address,
        password:form1?.value.password,
      }
    }else{
      this.payload={
        name:form1?.value.name,
        email:form1?.value.email,
        phoneNo:form2?.value.mobileNo,
        address:form2?.value.address,
       
      }
    }
     return this.http.post(AUTH_API+id,this.payload)
  }

  getAllUser():Observable<any>{
    return this.http.get(AUTH_API+"all-user");

  }
}

