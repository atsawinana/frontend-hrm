import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {
  }

  @Input() role = '';
  roleNormal: boolean = false;
  roleMana: boolean = false;
  roleHR: boolean = false;
  profile: boolean = false;
  timeattendance: boolean = false;
  department: boolean = false;
  leave: boolean = false;
  ot: boolean = false;
  car: boolean = false;
  activity: boolean = false;
  employee: boolean = false;

  ngOnInit() {
    if (this.role == '1') {
      this.roleNormal = true;
    } else if (this.role == '2') {
      this.roleMana = true;
    } else if (this.role == '3') {
      this.roleHR = true;
    }

    this.navigateActive();
    if (this.router.url == '/main') {
      this.profile = true;
    }
  }

  navigateActive() {
    if (this.router.url.includes('main/profile')) {
      this.profile = true;
    } else if (this.router.url.includes('main/timeattendance')) {
      this.timeattendance = true;
    } else if (this.router.url.includes('main/department')) {
      this.department = true;
    } else if (this.router.url.includes('main/leave')) {
      this.leave = true;
    } else if (this.router.url.includes('main/ot')) {
      this.ot = true;
    } else if (this.router.url.includes('main/car')) {
      this.car = true;
    } else if (this.router.url.includes('main/activity')) {
      this.activity = true;
    } else if (this.router.url.includes('main/employee')) {
      this.employee = true;
    }
  }

  URLcheck(event: any) {
    const clearClass = Array.from(document.getElementsByClassName('bg-active'));
    clearClass.forEach((element) => {
      element.classList.remove('bg-active');
    });

    this.router.events.subscribe((val) => {
      this.profile = false;
      this.timeattendance = false;
      this.department = false;
      this.leave = false;
      this.ot = false;
      this.car = false;
      this.activity = false;
      this.employee = false;
      if (val instanceof NavigationEnd) {
        this.navigateActive();
      }else{
        this.navigateActive();
      }
    });
  }
}
