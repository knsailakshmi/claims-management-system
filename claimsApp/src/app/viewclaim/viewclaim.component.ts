import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {TokenStorageService} from "../_services/token-storage.service";
import {DataService} from "../_services/data-service.service";
import {Claim} from "../models/Claim";

@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {

  claims:Claim[]=[]

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService,
              private dataService:DataService) { }

  ngOnInit(): void {
    let token=this.tokenStorageService.getToken()
    if (token != null) {
      this.dataService.getAllPendingClaims()
        .subscribe(response=>{
          // @ts-ignore
          this.claims=response.body
        })
    }

  }
  onUpdate(claimId:number){
    this.router.navigateByUrl('processclaim');
  }

}
