import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {FormControl, Validators} from "@angular/forms";
import {Claim} from "../models/Claim";
import {DataService} from "../_services/data-service.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {ClaimRequest} from "../models/ClaimRequest";
import {DatePipe} from "@angular/common";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-processclaim',
  templateUrl: './processclaim.component.html',
  styleUrls: ['./processclaim.component.css']
})
export class ProcessclaimComponent implements OnInit {

  claimId: number = 0
  remarks = new FormControl('', [
    Validators.required
  ]);
  claim!:Claim
  error:boolean|null=null;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private tokenStorageService: TokenStorageService,
              private datePipe:DatePipe,
              private router:Router) {
  }

  ngOnInit(): void {
    this.claimId = this.route.snapshot.params['claimId']
    this.dataService.getClaimById(this.claimId)
      .subscribe(response => {
        console.log(response)
        // @ts-ignore
        this.claim = response.body
      })
  }

  processClaim(approvalStatus: string) {
    let token = this.tokenStorageService.getToken()
    if (token != null) {
      let updateClaimRequest:ClaimRequest={
        memberId:this.claim.memberId,
        policyId:this.claim.policy.policyId,
        policyName:this.claim.policy.policyName,
        policyProvider:this.claim.policy.policyProvider,
        policyStartDate:this.claim.policy.policyStartDate,
        policyEndDate:this.claim.policy.policyEndDate,
        policyDescription:this.claim.policy.description,
        claimDescription:this.claim.description,
        claimRaisedDate:this.claim.claimRaisedDate,
        claimSettledDate:this.datePipe.transform(new Date(),"yyyy-MM-dd"),
        claimAmount:this.claim.claimAmount,
        claimStatus:approvalStatus,
        remarks:this.remarks.value
      }
      console.log(`update request is \n${updateClaimRequest}`)
      this.dataService.updateClaim(this.claimId,updateClaimRequest)
        .subscribe(response=>{
          this.error=true;
          setTimeout(()=>{                           
            this.error= null;
            this.router.navigateByUrl('viewclaim')
        }, 2000);
          
        })
    }
  }
}
