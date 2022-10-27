import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-overbutton',
  templateUrl: './employee-overbutton.component.html',
  styleUrls: ['./employee-overbutton.component.css']
})
export class EmployeeOverbuttonComponent implements OnInit {

  role: boolean = false

  ngOnInit() {
    if (localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3") {
      this.role = true
    }
  }

}
