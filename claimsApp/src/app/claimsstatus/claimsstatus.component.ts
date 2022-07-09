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
    if (this.tokenStorageService.getToken() !== null) {
      this.dataService.getClaimsByMember(this.tokenStorageService.getToken(),
        this.tokenStorageService.getUser().userid).subscribe(response => {
        console.log(response)
        // @ts-ignore
        this.claims = response.body
      })
    }

  }

}
