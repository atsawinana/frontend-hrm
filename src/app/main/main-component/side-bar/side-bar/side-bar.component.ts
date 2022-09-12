import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.navigateActive();
  }

  navigateActive() {
    if (this.router.url.includes('profile')) {
      const addClass = document.getElementById('profile');
      addClass?.classList.add('bg-active');
    } else if (this.router.url.includes('timeattendance')) {
      const addClass = document.getElementById('timeattendance');
      addClass?.classList.add('bg-active');
    } else if (this.router.url.includes('employee')) {
      const addClass = document.getElementById('employee');
      addClass?.classList.add('bg-active');
    } else if (this.router.url.includes('department')) {
      const addClass = document.getElementById('department');
      addClass?.classList.add('bg-active');
    } else if (this.router.url.includes('leave')) {
      const addClass = document.getElementById('leave');
      addClass?.classList.add('bg-active');
    } else if (this.router.url.includes('ot')) {
      const addClass = document.getElementById('ot');
      addClass?.classList.add('bg-active');
    }
    if (this.router.url.includes('car')) {
      const addClass = document.getElementById('car');
      addClass?.classList.add('bg-active');
    }
    if (this.router.url.includes('activity')) {
      const addClass = document.getElementById('activity');
      addClass?.classList.add('bg-active');
    }
  }

  URLcheck(event: any) {
    const clearClass = Array.from(document.getElementsByClassName('bg-active'));
    clearClass.forEach((element) => {
      element.classList.remove('bg-active');
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navigateActive();
      }
    });
  }
}
