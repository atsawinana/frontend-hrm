import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-person-btn',
  templateUrl: './data-person-btn.component.html',
  styleUrls: ['./data-person-btn.component.css'],
})
export class DataPersonBtnComponent implements OnInit {
  constructor(private router: Router) {}

  detail: boolean = true;
  workHistory: boolean = false;
  leaveHistory: boolean = false;
  otHistory: boolean = false;

  ngOnInit() {
    this.navigateActive()
    console.log(this.detail)
    console.log(this.workHistory)
    console.log(this.leaveHistory)
    console.log(this.otHistory)
  }

  navigateActive() {
    if (this.router.url.includes('detail')) {
      this.detail = true;
    } else if (this.router.url.includes('work-history')) {
      this.workHistory = true;
    } else if (this.router.url.includes('leave-history')) {
      this.leaveHistory = true;
    } else if (this.router.url.includes('ot-history')) {
      this.otHistory = true;
    }
  }

  URLcheck(event: any) {
    this.router.events.subscribe((val) => {
        this.detail = false;
        this.workHistory = false;
        this.leaveHistory = false;
        this.otHistory = false;
        this.navigateActive();
    });
}
}
