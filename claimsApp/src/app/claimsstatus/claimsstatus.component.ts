import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claim} from "../models/Claim";

@Component({
  selector: 'app-claimsstatus',
  templateUrl: './claimsstatus.component.html',
  styleUrls: ['./claimsstatus.component.css']
})
export class ClaimsstatusComponent implements OnInit {

  claims: Claim[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let url = "http://localhost:8080/claim"
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    })
    this.http.get(url, {
      headers: httpHeaders,
      observe: "response"
    }).subscribe(response => {
      // @ts-ignore
      this.claims=response.body["content"]
      console.log(this.claims[0])
    })
  }

}
