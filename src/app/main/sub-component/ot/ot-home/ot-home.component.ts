import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ot-home',
  templateUrl: './ot-home.component.html',
  styleUrls: ['./ot-home.component.css']
})
export class OtHomeComponent implements OnInit {

  constructor() { }
  role: any = false
  ngOnInit() {
    localStorage.setItem("overbtnOt", "true")
    let check = localStorage.getItem("roleUser")
    if (check == "3" || check == "2") {
      this.role = true
    }
  }

}
