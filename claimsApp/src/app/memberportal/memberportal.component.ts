import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-memberportal',
  templateUrl: './memberportal.component.html',
  styleUrls: ['./memberportal.component.css']
})
export class MemberportalComponent implements OnInit {

  user:any;
  userId:string='';

  constructor(private router: Router,private tokenStorage:TokenStorageService) {
   
   }

  ngOnInit(): void {
    this.user=this.tokenStorage.getUser();
    this.userId=this.user.userid;
    
  }
  onSubmitClick(){
    //navigate to submit claim page
    this.router.navigateByUrl('submitclaim');
  
  }
  onStatusClick(){
    //navigate to claim status page
    this.router.navigateByUrl('claimsstatus');
  }

  onUpdateClick(){
    //navigate to submit claim page
    this.router.navigateByUrl('updatemem');
  }

}
