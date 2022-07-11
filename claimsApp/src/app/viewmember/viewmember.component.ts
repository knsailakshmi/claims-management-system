import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewmember',
  templateUrl: './viewmember.component.html',
  styleUrls: ['./viewmember.component.css']
})
export class ViewmemberComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onUpdate(){
    this.router.navigateByUrl('processclaim');
  }

}

