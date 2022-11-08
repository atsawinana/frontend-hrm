import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

    role:boolean = false
    
  ngOnInit() {
    if(localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3"){
        this.role = true
    }
  }

}
