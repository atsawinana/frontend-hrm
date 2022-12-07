import { Component, OnInit } from '@angular/core';
import { LeaveHistoryPersonService } from './leave-history-person.service';

@Component({
  selector: 'app-leave-history-person',
  templateUrl: './leave-history-person.component.html',
  styleUrls: ['./leave-history-person.component.css']
})
export class LeaveHistoryPersonComponent implements OnInit {

  constructor(private historyservice: LeaveHistoryPersonService) { }

  ngOnInit() {
    let empid = localStorage.getItem('empPerson')
    this.historyservice.getUserProfile(empid, "").subscribe({
      next: (res: any) => { 

        console.log(res.data)

      },
      error: (err: any) => { }
    })
  }

}
