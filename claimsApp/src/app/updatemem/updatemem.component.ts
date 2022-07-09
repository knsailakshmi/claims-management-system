import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-updatemem',
  templateUrl: './updatemem.component.html',
  styleUrls: ['./updatemem.component.css']
})
export class UpdatememComponent implements OnInit {
  user:any;
  userId:string='';

  constructor(private authService:AuthService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    console.log("inside the updatemember"+this.tokenStorage.getToken())
    this.user=this.tokenStorage.getUser()
    console.log(this.user)
    this.userId=this.user.userid

    this.authService.getUser(this.userId).subscribe(
      data=>{
        console.log(data)
      }
    )
  }

}
