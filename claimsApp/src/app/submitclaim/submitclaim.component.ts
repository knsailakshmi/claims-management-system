import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {DataService} from "../_services/data-service.service";
import {ClaimRequest} from "../models/ClaimRequest";
import {TokenStorageService} from "../_services/token-storage.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {

  request: ClaimRequest = {
    memberId: 0,
    policyId: 0,
    policyName: "",
    policyProvider: "",
    policyStartDate: new Date(),
    policyEndDate: new Date(),
    policyDescription: "",
    claimDescription: "",
    claimRaisedDate: "",
    claimSettledDate: "",
    claimAmount: 0,
    claimStatus: "Pending",
    remarks: null,
  }
  auth:string|null=null

  constructor(private httpClient: HttpClient,
              private dataService: DataService,
              private tokenStorageService: TokenStorageService,
              private datePipe:DatePipe) {
    if (tokenStorageService.getToken() !== null) {
      this.auth=tokenStorageService.getToken()
      let user=tokenStorageService.getUser()
      console.log(user)
      this.request.memberId=user.userid
    }
    this.request.claimRaisedDate=this.datePipe.transform(new Date(),"yyyy-MM-dd")
  }

  ngOnInit(): void {
  }

  addToDatabase() {
    if (this.auth != null) {
      this.dataService.sendSubmitClaimRequest(this.auth, this.request).subscribe(response => {
        let message = response.status === HttpStatusCode.Created ? "Claim Added successfully" : "Something went wrong"
        alert(message)
      })
    }
  }
}
