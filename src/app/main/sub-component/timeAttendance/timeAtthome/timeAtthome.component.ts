import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { map, share, Subject, Subscription, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timeAtthome',
  templateUrl: './timeAtthome.component.html',
  styleUrls: ['./timeAtthome.component.css']
})
export class TimeAtthomeComponent implements OnInit {

  date: any

  time = new Date();
  timedatethai = new Date();
  result = this.timedatethai.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
  rxTime: any;
  intervalId: any;
  subscription: Subscription | undefined;
  role:boolean = false

  constructor() {

  }

  ary: any = [1, 2, 3]
  listPerPage: any = 5

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.listPerPage,
    currentPage: 1,
  };

  listPerpage() {
    this.config.itemsPerPage = this.listPerPage
  }

  ngOnInit() {

    let role = localStorage.getItem('roleUser')
    if(role == '2' || role == '3'){
      this.role = true
    }

    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = moment(time).format('HH:mm:ss');
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
