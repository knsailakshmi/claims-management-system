import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {DataService} from "../_services/data-service.service";
import {ClaimRequest} from "../models/ClaimRequest";
import {TokenStorageService} from "../_services/token-storage.service";
import {DatePipe} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";
import {
  dateGreaterThanEqualToToday,
  dateLessThanEqualToToday, maxClaimAmountValidator, minClaimAmountValidator,
  noWhitespaceValidator
} from "../_helper/confiremed.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {

  policyId=new FormControl('',[
      Validators.required
    ])
  policyName=new FormControl('',[
    Validators.required,
    noWhitespaceValidator()])
  policyProvider=new FormControl('',[
    Validators.required,
    noWhitespaceValidator()])
  policyStartDate=new FormControl('',[
    Validators.required,
    dateLessThanEqualToToday()])
  policyEndDate=new FormControl('',[
    Validators.required,
    dateGreaterThanEqualToToday()])
  policyDescription=new FormControl('',[
    Validators.required,
    noWhitespaceValidator()])
  claimDescription=new FormControl('',[
    Validators.required,
    noWhitespaceValidator()])
  claimAmount=new FormControl('',[
    Validators.required,
    minClaimAmountValidator(),
    maxClaimAmountValidator()])
  error:boolean|null=null
  constructor(private httpClient: HttpClient,
              private dataService: DataService,
              private tokenStorageService: TokenStorageService,
              private datePipe:DatePipe,
              private router:Router) {
  }

  ngOnInit(): void {
    console.log(this.tokenStorageService.getUser())
  }


  addToDatabase() {

    let token=this.tokenStorageService.getToken()
    if (token != null) {
      let request: ClaimRequest = {
        memberId: this.tokenStorageService.getUser().userid,
        policyId: this.policyId.value,
        policyName: this.policyName.value,
        policyProvider: this.policyProvider.value,
        policyStartDate: this.datePipe.transform(this.policyStartDate.value,"yyyy-MM-dd"),
        policyEndDate: this.datePipe.transform(this.policyEndDate.value,"yyyy-MM-dd"),
        policyDescription: this.policyDescription.value,
        claimDescription: this.claimDescription.value,
        claimRaisedDate: this.datePipe.transform(new Date(),"yyyy-MM-dd"),
        claimSettledDate: null,
        claimAmount: this.claimAmount.value,
        claimStatus: "Pending",
        remarks: null,
      }
      this.dataService.sendSubmitClaimRequest(request).subscribe(response => {
        if(response.status===HttpStatusCode.Created){
          this.error=false
          setTimeout(()=>{
            this.error=null
            this.router.navigateByUrl('memberportal')
            window.location.reload()
          },2000)
        }
      },(error) =>{
        this.error=true
        setTimeout(()=>{
          this.error=null
        },3000)
      } )
    }
  }
}





