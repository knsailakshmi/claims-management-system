import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onUpdate(){
    this.router.navigateByUrl('processclaim');
  }

}
