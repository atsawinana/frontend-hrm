import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-department',
  templateUrl: './btn-department.component.html',
  styleUrls: ['./btn-department.component.css'],
})
export class BtnDepartmentComponent implements OnInit {
  role: boolean = false;
  route1 = localStorage.getItem('overbtn');

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('roleUser') == '3') this.role = true;
  }

  clickRouteEmployee() {
    this.route1 = 'true';
    localStorage.setItem('overbtn', String(this.route1));
    let id = localStorage.getItem('dept_id_emp')
    this.router.navigate([`/main/department/emp-department/${id}`]);
    // emp-department
  }

  clickRouteEndContract() {
    this.route1 = 'false';
    localStorage.setItem('overbtn', String(this.route1));
    let tempURL = this.router.url.replace('emp-department','emp-end-department')
    this.router.navigate([tempURL]);
  }
}
