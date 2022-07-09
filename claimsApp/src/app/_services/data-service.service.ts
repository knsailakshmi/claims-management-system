import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClaimRequest} from "../models/ClaimRequest";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  auth:string=""
  httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    'Cache-Control':'no-cache',
    'Authorization':this.auth
  })
  constructor(private http:HttpClient,private datePipe:DatePipe) { }

  sendSubmitClaimRequest(auth:string,requestBody:ClaimRequest){
    let url="http://localhost:8000/claim"
    this.datePipe.transform(requestBody.policyStartDate,"yyyy-MM-dd")
    this.datePipe.transform(requestBody.policyEndDate,"yyyy-MM-dd")
    console.log(requestBody)
    return this.http.post(url,requestBody,{
      headers:this.httpHeaders,
      observe:"response"
    })
  }

  getClaimsByMember(auth: string | null, userId: string){
    let url=`http://localhost:8000/claim/user/${userId}/view`
    if (auth != null) {
      this.auth = auth
    }
    return this.http.get(url,{
      headers:this.httpHeaders,
      observe:"response",
    })
  }
}
