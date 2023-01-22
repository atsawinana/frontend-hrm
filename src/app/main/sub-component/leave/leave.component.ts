import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
