import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('overbtnLeave') == null)
        localStorage.setItem('overbtnLeave',"true")

  }

}
