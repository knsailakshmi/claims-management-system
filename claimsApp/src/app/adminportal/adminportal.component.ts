import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.css']
})
export class AdminportalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  onUpdateClick(){
    //navigate to submit claim page
    this.router.navigateByUrl('updatemem');
  
  }
  onProcessClick(){
    this.router.navigateByUrl('processclaim');
  }

}
