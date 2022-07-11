import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Member } from '../models/Member';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-viewmember',
  templateUrl: './viewmember.component.html',
  styleUrls: ['./viewmember.component.css']
})
export class ViewmemberComponent implements OnInit {
  members:Member[]=[];

  constructor(private router: Router,private tokenStorage:TokenStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    let token=this.tokenStorage.getToken()
    if (token != null) {
      this.authService.getAllUser()
        .subscribe(response=>{
          
          // @ts-ignore
          this.members=response
          console.log(this.members);
          
        })
    }else{
      this.router.navigate(['./home']);
    }
  }
  onUpdate(){
    this.router.navigateByUrl('processclaim');
  }

}

