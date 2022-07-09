import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClaimRequest} from "../models/ClaimRequest";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private datePipe:DatePipe) { }

  sendSubmitClaimRequest(auth: string,requestBody:ClaimRequest){
    let url="http://localhost:8000/claim"
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      'Cache-Control':'no-cache',
      'Authorization':auth
    })
    this.datePipe.transform(requestBody.policyStartDate,"yyyy-MM-dd")
    this.datePipe.transform(requestBody.policyEndDate,"yyyy-MM-dd")
    console.log(requestBody)
    return this.http.post(url,requestBody,{
      headers:httpHeaders,
      observe:"response"
    })
  }
}
