import { Component, OnInit } from '@angular/core';
import { LeaveViewRequestService } from './leave-view-request.service';

@Component({
  selector: 'app-leave-view-request',
  templateUrl: './leave-view-request.component.html',
  styleUrls: ['./leave-view-request.component.css']
})
export class LeaveViewRequestComponent implements OnInit {

  constructor(private leaveviewreqest: LeaveViewRequestService) { }

  ngOnInit() {
    this.leaveviewreqest.getAllshowUnapproved().subscribe({
        next: (res:any) => {
            console.log(res.data)
        },
        error: (err:any) => {}
    })
  }

}
