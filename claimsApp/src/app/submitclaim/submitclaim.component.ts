import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {

  memberId:number;
  policyId:number;
  policyName:string;
  policyProvider:string;
  policyStartDate:Date;
  policyEndDate:Date;
  policyDescription:string;
  claimDescription:string;
  claimRaisedDate:Date;
  claimSettledDate:Date|null;
  claimAmount:number;
  claimStatus:string;
  remarks:string|null;
  constructor(private httpClient:HttpClient,public datePipe:DatePipe) {
    this.memberId=1;
    this.policyId=1;
    this.policyName="";
    this.policyProvider="";
    this.policyStartDate=new Date();
    this.policyEndDate=new Date();
    this.policyDescription="";
    this.claimDescription="";
    this.claimRaisedDate=new Date();
    this.claimSettledDate=null;
    this.claimAmount=0;
    this.claimStatus="Pending";
    this.remarks=null;
  }

  ngOnInit(): void {
  }


  showValues() {
    console.log(this.memberId);
    console.log(this.policyId);
    console.log(this.policyName);
    console.log(this.policyProvider);
    console.log(this.policyStartDate);
    console.log(this.policyEndDate);
    console.log(this.policyDescription);
    console.log(this.claimDescription);
    console.log(this.claimRaisedDate);
    console.log(this.claimSettledDate);
    console.log(this.claimAmount);
    console.log(this.claimStatus);
    console.log(this.remarks);
  }
  addToDatabase(){
    let url="http://localhost:8080/claim"
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      'Cache-Control':'no-cache',

    })
    this.httpClient.post(url,{
      "memberId":1,
      "policyId":this.policyId,
      "policyName":this.policyName,
      "policyProvider":this.policyProvider,
      "policyStartDate":this.datePipe.transform(this.policyStartDate,"yyyy-MM-dd"),
      "policyEndDate":this.datePipe.transform(this.policyEndDate,"yyyy-MM-dd"),
      "policyDescription":this.policyDescription,
      "claimDescription":this.claimDescription,
      "claimRaisedDate":this.datePipe.transform(this.claimRaisedDate,"yyyy-MM-dd"),
      "claimSettledDate":this.claimSettledDate,
      "claimAmount":this.claimAmount,
      "claimStatus":this.claimStatus,
      "remarks":this.remarks
    },{
      headers:httpHeaders,
      observe:'response'

    }).subscribe(response =>{
      console.log(response)
      let message=response.status===HttpStatusCode.Created?"Claim Added successfully":"Something went wrong"
      alert(message)
    })
  }
}
