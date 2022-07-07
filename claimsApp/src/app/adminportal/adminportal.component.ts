import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.css']
})
export class AdminportalComponent implements OnInit {

  user:any;
  userId:string='';

  constructor(private router: Router,private tokenStorage:TokenStorageService) { 
    
  }

  ngOnInit(): void {
    this.user=this.tokenStorage.getUser();
    this.userId=this.user.userid;
  }
  
  onUpdateClick(){
    //navigate to submit claim page
    this.router.navigateByUrl('updatemem');
  
  }
  onProcessClick(){
    this.router.navigateByUrl('processclaim');
  }

}
