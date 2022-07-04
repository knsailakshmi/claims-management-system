import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberportal',
  templateUrl: './memberportal.component.html',
  styleUrls: ['./memberportal.component.css']
})
export class MemberportalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmitClick(){
    //navigate to submit claim page
    this.router.navigateByUrl('submitclaim');
  
  }
  onStatusClick(){
    //navigate to claim status page
    this.router.navigateByUrl('claimsstatus');
  }

}
