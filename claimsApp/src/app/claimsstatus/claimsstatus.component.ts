import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Claim} from "../models/Claim";
import {DataService} from "../_services/data-service.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-claimsstatus',
  templateUrl: './claimsstatus.component.html',
  styleUrls: ['./claimsstatus.component.css']
})
export class ClaimsstatusComponent implements OnInit {

  claims: Claim[] = []

  constructor(private http: HttpClient,
              private dataService: DataService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    let token=this.tokenStorageService.getToken()
    let user=this.tokenStorageService.getUser()
    console.log(user)
    if (token != null) {
      this.dataService.getClaimsByMember(user.userid).subscribe(response => {
        console.log(response)
        // @ts-ignore
        this.claims = response.body
      })
    }
  }

}
